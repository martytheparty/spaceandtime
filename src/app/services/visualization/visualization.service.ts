import { inject, Injectable, QueryList } from '@angular/core';
import { StVisualization } from '../../interfaces/st/visualization/st-visualization';
import { VizComponent } from '../../components/viz/viz.component';
import { RecyclableSequenceService } from '../utilities/recyclable-sequence-service.service';
import { HashService } from '../utilities/hash.service';
import { AppModelService } from '../appmodel/appmodel.service';
import { RendererService } from '../three/renderer/renderer.service';

@Injectable({
  providedIn: 'root'
})
export class VisualizationService {

  private recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);
  private hashService: HashService = inject(HashService);
  private appModelService: AppModelService = inject(AppModelService); 
  private rendererService: RendererService = inject(RendererService);

  viewPortWidth = window.innerWidth;
  viewPortHeight = window.innerHeight;

  visualizations: StVisualization[] = [];

  visualizationHashValue = "";
  renderedLayoutHash = "";
 

  constructor() { }

  getVisualizations(): StVisualization[] {
    return this.visualizations;
  }

  createVisualization(stRendererId: number, vizComponent: VizComponent): number {
    
    let visualizationId = 0;
    const ele: HTMLDivElement = vizComponent.rendererViewChild?.nativeElement;

    if (ele) {
      visualizationId = this.recyclableSequenceService.generateId();
      const visualization: StVisualization = {
        stVisualizationId: visualizationId,
        stLeft: 0,
        stTop: 0,
        stWidth: 0,
        stHeight: 0,
        stRendererId,
        manualPlacement: false,
        vizComponent
      };

      const vizPosition = this.visualizations.length;
      const vizWidth = ele.offsetWidth;
      const vizHeight = ele.offsetHeight;

      // push viz into array
      this.visualizations.push(visualization);

      visualization.stWidth = vizWidth;
      visualization.stHeight = vizHeight;


      this.calculatePositions();
      this.resetHash(vizWidth, vizHeight);
    }

    return visualizationId;
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
      this.upsertVizForComponent.bind(this)
    );

    return vizComponents.length;
  }

  upsertVizForComponent(vizComponent: VizComponent): boolean {
    // determine if a viz for this component already exists
    const emptyVisualization = this.getFirstEmptyVisualization(); // we should not be getting the first... we should be checking for the specific one.

    const existingVisualization: StVisualization | undefined = this.getVizForComponent(vizComponent, this.getVisualizations());
    let hadEmpty = false;

    this.initializeExistingWithComponent(existingVisualization, vizComponent);

    if (!existingVisualization && emptyVisualization) { // a viz exists but it does not have a component
      emptyVisualization.vizComponent = vizComponent;
      vizComponent.setAsInitialized();
      hadEmpty = true;
    } else {
      this.createVizForComponent(vizComponent);
    }

    return hadEmpty;
  }

  initializeExistingWithComponent(existingVisualization: StVisualization | undefined, vizComponent: VizComponent): boolean
  {
    let initialized = false;

    if (existingVisualization) { // it already a viz and doesn't need one
      existingVisualization.vizComponent = vizComponent;
      vizComponent.setAsInitialized();
      initialized = true;
    }

    return initialized;
  }

  getVizForComponent(vizComponent: VizComponent, stVisualizations: StVisualization[]): StVisualization | undefined
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
      return vizComponent.stRendererInputId() === stViz.stRendererId;
    }
  }



  getFirstEmptyVisualization(): StVisualization | undefined {
    let stVisualization: StVisualization | undefined;

    this.visualizations.forEach(
      (visualization: StVisualization) => {
        if (!visualization.vizComponent && stVisualization === undefined) {
          stVisualization = visualization;
        }
      }
    );

    return stVisualization;
  }

  createVizForComponent(vizComponent: VizComponent): boolean {
        // create a stLayout with a reference to this layout component
        if (!vizComponent.isInitialized()) {
          this.createVisualization(vizComponent.stRendererInputId(), vizComponent);
        }

        return vizComponent.setAsInitialized();
  }

  calculatePositions(): void
  {
    // 1) this can't handle a single viz that is wider than the view port
    // 2) hard coded to 200px height per row.  So when we have configurable
    // viz heights this will break (vert overlap);
    if (this.viewPortWidth !== window.innerWidth) {
      this.viewPortWidth = window.innerWidth; // possible reflow
      this.resetHash(this.viewPortWidth, this.viewPortHeight);
    }

    this.setCalculatedPositions(this.isTooWide, this.viewPortWidth, this.visualizations);
  }

  setCalculatedPositions(
    isTooWide: (left: number, width: number, viewportWidth: number) => boolean,
    viewPortWidth: number,
    visualizations: StVisualization[]
  ): void
  {
    let row = 0;
    let previousRight = 0;
    // figure out if the row are full and then if they find the next one;

    // one we have a row figure out which column is available;
    let nextAvailableLext = 0;

    // TRY RESETTING ALL VIZ FOR REFLOW
    if (this.appModelService.getReflow() === 'always') {
      visualizations.forEach(
        (viz: StVisualization) => {
          viz.stLeft = -1;
          viz.stTop = -1;
          viz.manualPlacement = false;
        }
      )
    }

    visualizations.forEach(
      (viz: StVisualization) => {
        if(!viz.manualPlacement)
        {
          // when reflow is on an we add it is shifting...
          let nextAvailableTop = this.getNextAvailableTop(viz, this.getVisualizations(), this.viewPortWidth); 
          let currentLeft = this.getNextAvailableLeft(visualizations, nextAvailableTop, viz);
          
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
    const data: any[] = this.visualizations.map( 
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

  deleteComponentForId(id: number): boolean
  {
    let found = false;

    this.visualizations.forEach(
      (visualization: StVisualization) => {
        if (visualization.stRendererId === id) {
          found = true;
          delete visualization.vizComponent;
        }
      }
    );

    return found;
  }

  pruneVisualizationsByRendererId(stRendererId: number): boolean
  {
    let updated = false;
    const newVisualizations: StVisualization[] = this.filterVisualizationForRendererId(stRendererId, this.visualizations);

    if (newVisualizations.length < this.visualizations.length) {
      this.visualizations = newVisualizations;
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
    this.visualizations = this.filterVisualizationForRendererId(stRendererId, this.visualizations);

    return this.visualizations;
  }

  deleteVisualizationForRendererIdFilter(stRendererId: number)
    : (stVisualization: StVisualization) => boolean 
  {
    return (stVisualization: StVisualization) => 
      // Keep only visualizations that don't match the renderer ID
      stVisualization.stRendererId !== stRendererId;
  }

}
