import { inject, Injectable, QueryList } from '@angular/core';
import { StVisualization } from '../../../interfaces/st/visualization/st-visualization';
import { VizComponent } from '../../../components/viz/viz.component';
import { RecyclableSequenceService } from '../../utilities/general/recyclable-sequence-service.service';
import { HashService } from '../../utilities/general/hash.service';
import { AppModelService } from '../../appmodel/appmodel.service';
import { VizComponentService } from '../../angular/viz-component.service';
import { WViewPortService } from '../../ui/w-view-port.service';

@Injectable({
  providedIn: 'root'
})
export class VisualizationService {

  private recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);
  private hashService: HashService = inject(HashService);
  private appModelService: AppModelService = inject(AppModelService); 
  private vizComponentService: VizComponentService = inject(VizComponentService);
  private wViewPortService: WViewPortService = inject(WViewPortService);

  // save the width when the visualization was rendered
  viewPortWidth = this.wViewPortService.getViewPortWidth();
  viewPortHeight = this.wViewPortService.getViewPortHeight();

  stVisualizations: StVisualization[] = [];

  visualizationHashValue = "";
  renderedLayoutHash = "";

  constructor() { }

  resetAllStVisualizationComponent(): boolean {
    this.stVisualizations.forEach(
      (stVisualization: StVisualization) => {
        stVisualization.stVizComponentId = -1;
      }
    );
    return true;
  }

  getStVisualizations(): StVisualization[] {
    return this.stVisualizations;
  }

  createStVisualization(stRendererId: number, vizComponent: VizComponent): number {
    let stVisualizationId = 0;
    const ele: HTMLDivElement = vizComponent.rendererViewChild?.nativeElement;

    if (ele) {
      stVisualizationId = this.recyclableSequenceService.generateId();
      const visualization: StVisualization = {
        stVisualizationId: stVisualizationId,
        stLeft: 0,
        stTop: 0,
        stWidth: 0,
        stHeight: 0,
        stRendererId,
        stVizComponentId: vizComponent.stVizComponentId,
        manualPlacement: false,
        //vizComponent
      };
      // we set the visualization when we create a new StVisualization but not when we update
      this.vizComponentService.setVizComponentByStComponentId(vizComponent);

      // const vizPosition = this.visualizations.length;
      const vizWidth = ele.offsetWidth;
      const vizHeight = ele.offsetHeight;

      // push viz into array
      this.stVisualizations.push(visualization);

      visualization.stWidth = vizWidth;
      visualization.stHeight = vizHeight;


      this.calculatePositions();
      this.resetHash(vizWidth, vizHeight);
    }

    return stVisualizationId;
  }

  setupDomVisualizations(visualizationItems: QueryList<VizComponent>): number
  {
    let count = 0;
    if (visualizationItems) {
      const vizArrary = visualizationItems.toArray();
      count = vizArrary.length;
      this.setupVisualizations(vizArrary);
    }

    return count;
  }

  setupVisualizations(vizComponents: VizComponent[]): void {
    // const vizComponents: VizComponent[] = this.visualizationItems.toArray();

    this.setupVisualizationItems(vizComponents);
  }

  setupVisualizationItems(vizComponents: VizComponent[]): number {
    vizComponents.forEach(
      this.upsertStVisualizationForComponent.bind(this)
    );

    return vizComponents.length;
  }

  upsertStVisualizationForComponent(
    vizComponent: VizComponent,
    index: number,
    vizComponents: VizComponent[]
  ): boolean {

    let createdStVisualization = false;

    // we have a new component and it has not been attached to an StVisualization
    if (!vizComponent.isAttached()) {
      // Finds the first visualization that has a refence to a component that no 
      // long exists.
      const staleStVisualization = this.getFirstStaleStVisualization(vizComponents); 

      if (staleStVisualization) {
        // we need to delete the reference to the old visualizaton component from the dictionary
        this.vizComponentService.deleteVizComponentByStComponentId(staleStVisualization.stVizComponentId);
        // we need to add a new reference to the component in the dictionary
        this.vizComponentService.setVizComponentByStComponentId(vizComponent);
        // update the StVisualization's component id accordingly
        staleStVisualization.stVizComponentId = vizComponent.stVizComponentId;
      } else {
        // A new visualization was added but there is not an empty StVisualization
        // so a new StVisualization needs to be added.
        this.createStVisualization(vizComponent.stRendererInputId(), vizComponent);
        // update the created flag;
        createdStVisualization = true;
      }

      vizComponent.setAsAttached();



    }

    return createdStVisualization;

  }

  getStVisualizationForComponent(vizComponent: VizComponent, stVisualizations: StVisualization[]): StVisualization | undefined
  {
    // create a finder function (predicate factory function)
    let findFunction = this.findComponentFactoryFunction(vizComponent);

    // find the visualization
    let stVisualization: StVisualization | undefined = stVisualizations.find(findFunction);;

    // return the visualization
    return stVisualization;
  }

  findComponentFactoryFunction(vizComponent: VizComponent): (stViz: StVisualization) => boolean
  {
    return (stViz: StVisualization) => {
      return vizComponent.stRendererInputId() === stViz.stVizComponentId; // I think that this is a bug I think we need to look for stVizComponentId
    }
  }



  getFirstStaleStVisualization(vizComponents: VizComponent[]): StVisualization | undefined {
    // determine if there is a StVisualization that has a component id that no long exists

    let stVisualization: StVisualization | undefined;

    this.stVisualizations.forEach(
      (localStVisualization: StVisualization) => {
        // 1 - make sure that the stComponentId for this StVisualization still exists

        const index = vizComponents.findIndex( (vizComponent) => {
          return vizComponent.stVizComponentId === localStVisualization.stVizComponentId
        } );

        if (index === -1 && stVisualization === undefined) {
          stVisualization = localStVisualization;
        }
      }
    );

    return stVisualization;
  }

  calculatePositions(): void
  {
    // 1) this can't handle a single viz that is wider than the view port
    // 2) hard coded to 200px height per row.  So when we have configurable
    // viz heights this will break (vert overlap);
    if (this.viewPortWidth !== this.wViewPortService.getViewPortWidth()) {
      this.viewPortWidth = this.wViewPortService.getViewPortWidth(); // possible reflow
      this.resetHash(this.viewPortWidth, this.viewPortHeight);
    }

    this.setCalculatedPositions(this.isTooWide, this.viewPortWidth, this.stVisualizations);
  }

  setCalculatedPositions(
    isTooWide: (left: number, width: number, viewportWidth: number) => boolean,
    viewPortWidth: number,
    stVisualizations: StVisualization[]
  ): void
  {
    // FOR SOME REASON MANUAL PLACEMENT IS NEVER SET TO TRUE ON THE LAST
    // VISUALIZATION
    let row = 0;
    let previousRight = 0;
    // figure out if the row are full and then if they find the next one;

    // one we have a row figure out which column is available;
    let nextAvailableLext = 0;

    // TRY RESETTING ALL VIZ FOR REFLOW
    if (this.appModelService.getReflow() === 'always') {
      stVisualizations.forEach(
        (viz: StVisualization) => {
          viz.stLeft = -1;
          viz.stTop = -1;
          viz.manualPlacement = false;
        }
      )
    }

    stVisualizations.forEach(
      (viz: StVisualization) => {
        if(!viz.manualPlacement)
        {
          // when reflow is on an we add it is shifting...
          let nextAvailableTop = this.getNextAvailableTop(viz, this.getStVisualizations(), this.viewPortWidth); 
          let currentLeft = this.getNextAvailableLeft(stVisualizations, nextAvailableTop, viz);
          
          viz.stTop = nextAvailableTop;
          viz.stLeft = currentLeft;

          // set the previous right for the beginning of the next itteration
          previousRight = currentLeft + viz.stWidth;
          viz.manualPlacement = true;
        }
      }
    );
  }

  getNextAvailableLeft(
      visualizations: StVisualization[], 
      nextAvailableTop: number, 
      viz: StVisualization): number
  {
    const rowSiblings = this.getRowSiblings(visualizations, nextAvailableTop, viz);
    const nextLeft = this.getNextAvailableRight(rowSiblings);
    return nextLeft;
  }

  getNextAvailableTop(viz: StVisualization, visualizations: StVisualization[], viewPortWidth: number): number
  {
    let top = 0; 
    let newTopFound = false;

    // can the current row accommodate a new visualization?

    while(!newTopFound) {
      // a top is a vertical position
      // a row all of the objects width and the top
      newTopFound = this.isRowAvailable(top, viz, visualizations, viewPortWidth);

      if (!newTopFound) {
      // + viz.stHeight because they are all the same height.

        const rowHeight = viz.stHeight; // this will NOT always be true
        top = top + rowHeight;
      }
    }

    return top;
  }

  isRowAvailable(currentRow: number, currentViz: StVisualization, visualizations: StVisualization[], viewPortWidth: number): boolean
  {
    let available = true;

    available = this.rowHasRoom(visualizations, currentViz, viewPortWidth, currentRow);

    return available;
  }

  rowHasRoom(visualizations: StVisualization[], currentViz: StVisualization, viewportWidth: number, currentRow: number): boolean
  {
    let available = true;
        visualizations.forEach(
      (viz: StVisualization, index: number, currentVizList: StVisualization[]) => {
        // 1 ignore self
        if (currentViz.stRendererId !== viz.stRendererId) { // two visualizations can't share a renderer because a renderer had a dom element so both vizs would show in the same place
          // 2 determine if there is anything in the row
          // getting siblings for a row is important so I need to break this into its own function
          const constRowSiblings: StVisualization[] = this.getRowSiblings(currentVizList, currentRow, currentViz);

          available = this.getRowAvailabilityForPotentialSiblings(constRowSiblings, currentViz, viewportWidth)
        }

      }
    );

    return available;
  }

  getRowAvailabilityForPotentialSiblings(
    potentialsSiblings: StVisualization[],
    currentViz: StVisualization,
    viewPortWidth: number
  ): boolean
  {
    let available = true;

    if (potentialsSiblings.length > 0) {

      const end = this.getNextAvailableRight(potentialsSiblings); // get the farthest right
      const rightPositionCandidate = this.getRightPositionCandidate(end, currentViz.stWidth);

      available = this.compareRightToWidth(rightPositionCandidate, viewPortWidth);
    }
    // todo - figure out how to fix gaps...
    return available;
  }

  getRightPositionCandidate(startPosition: number, vizWidth: number): number
  {
    return startPosition + vizWidth;
  }

  compareRightToWidth(right: number, width: number): boolean
  {
    let available = true;
    if (right > width) {
      available = false;
    }
    return available;
  }

  getRowSiblings(currentVizList: StVisualization[], currentRow: number, currentViz: StVisualization): StVisualization[]
  {
    // create a filter function based on the current row and current viz
    const rowSiblingsFilter = this.isRowSibling(currentRow, currentViz);
    
    return currentVizList.filter(rowSiblingsFilter);
  }

  isRowSibling(currentRow: number, currentViz: StVisualization): (mappedViz: StVisualization) => boolean
  {
    return (mappedViz: StVisualization) =>
      mappedViz.stTop === currentRow &&
      mappedViz.stRendererId !== currentViz.stRendererId;
  }

  getNextAvailableRight(rowSiblings: StVisualization[]): number
  {
    // info: assumes that the next right is the furthermost right
    // the furthermost right is the left position + width of the rightmost viz
    
    // 1.  Set right to 0 to start
    let right = 0; // initialize right to 0
    
    if (rowSiblings.length > 0) {

      // 2 create a new list of the visualizations sorted by left position (largest to smallest)
      const sortedVisualizations: StVisualization[] = this.getHorizontallySortedVisualizations(rowSiblings); 

      // 3 get the rightmost vis - since the array is sorted it is the first one.
      const rightMostVisualization: StVisualization = sortedVisualizations[0];

      // 4 the the next available right is the rightmost viz + its width
      right = rightMostVisualization.stLeft + rightMostVisualization.stWidth;
    }

    return right;
  }

  getHorizontallySortedVisualizations(rowSiblings: StVisualization[]): StVisualization[]
  {
    // create a new shallow of the array
    const sortedArray = [...rowSiblings];

    sortedArray.sort( this.horizontalSortComparator );

    return sortedArray;
  }

  horizontalSortComparator(stVisualizationA: StVisualization, stVisualizationB: StVisualization): number
  {
      return stVisualizationB.stLeft - stVisualizationA.stLeft;
  }


  isTooWide(left: number, width: number, viewportWidth: number): boolean
  {
    return (left + width > viewportWidth);
  }

  resetHash(width: number, height: number): Promise<void>
  {
    // create hash string
    const data: any[] = this.stVisualizations.map( 
      (viz: StVisualization) => {
        return {
          stRendererId: viz.stRendererId,
          stLeft: viz.stLeft,
          stTop: viz.stTop,
          stWidth: viz.stWidth,
          stHeight: viz.stHeight,
          manualPlacement: viz.manualPlacement
        };
      }
    );


    const hashString = width.toString() + height.toString() + JSON.stringify(data);
    return this.hashService.getHashString(hashString).then(
      (hash: string) => {
        this.visualizationHashValue = hash;
      }
    );
  }

  deleteComponentForId(id: number): number
  {

    // this.visualizations.forEach(
    //   (visualization: StVisualization) => {
    //     if (visualization.stRendererId === id) {
    //       found = true;
    //       delete visualization.vizComponent;
    //     }
    //   }
    // );

    const visualizations: StVisualization[] = this.deleteVisualizationForRendererId(id);

    return visualizations.length;
  }

  pruneVisualizationsByRendererId(stRendererId: number): boolean
  {
    let updated = false;
    const newVisualizations: StVisualization[] = this.filterVisualizationForRendererId(stRendererId, this.stVisualizations);

    if (newVisualizations.length < this.stVisualizations.length) {
      this.stVisualizations = newVisualizations;
      updated = true;
    }

    return updated;
  }


  filterVisualizationForRendererId(stRendererId: number, stVisualizations: StVisualization[]): StVisualization[]
  {
    const deleteFilterFn = this.deleteVisualizationForRendererIdFilter(stRendererId);

    const visualizations: StVisualization[] = stVisualizations.filter(deleteFilterFn);
    return visualizations;
  }

  deleteVisualizationForRendererId(stRendererId: number): StVisualization[]
  {
    // this does not actually delete the viz it removes the link from the array
    this.stVisualizations = this.filterVisualizationForRendererId(stRendererId, this.stVisualizations);

    return this.stVisualizations;
  }

  deleteVisualizationForRendererIdFilter(stRendererId: number)
    : (stVisualization: StVisualization) => boolean 
  {
    return (stVisualization: StVisualization) => 
      // Keep only visualizations that don't match the renderer ID
      stVisualization.stRendererId !== stRendererId;
  }

}
