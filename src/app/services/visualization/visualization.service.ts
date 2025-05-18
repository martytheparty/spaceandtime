import { inject, Injectable } from '@angular/core';
import { StVisualization } from '../../interfaces/st/visualization/st-visualization';
import { VizComponent } from '../../components/viz/viz.component';
import { RecyclableSequenceService } from '../utilities/recyclable-sequence-service.service';
import { HashService } from '../utilities/hash.service';

@Injectable({
  providedIn: 'root'
})
export class VisualizationService {

  private recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);
  private hashService: HashService = inject(HashService);

  viewPortWidth = window.innerWidth;
  viewPortHeight = window.innerHeight;

  visualizationIds: number[] = [];

  visualizations: StVisualization[] = [];

  visualizationHashValue = "";
  renderedLayoutHash = "";
 

  constructor() { }

  getVisualizationIds(): number[] {
    return this.visualizationIds;
  }

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
      this.visualizationIds.push(visualizationId);

      visualization.stWidth = vizWidth;
      visualization.stHeight = vizHeight;


      this.calculatePositions();
      this.resetHash(vizWidth, vizHeight);
    }

    return visualizationId;
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

    visualizations.forEach(
      (viz: StVisualization) => {
        let currentLeft = 0;

        const needsNewRow = isTooWide(previousRight, viz.stWidth, viewPortWidth);

        if (needsNewRow)
        {
          row = row + 1;
        } else  {
          currentLeft = previousRight;
        }

        viz.stTop = row * 200;
        viz.stLeft = currentLeft;

        // set the previous right for the beginning of the next itteration
        previousRight = currentLeft + viz.stWidth;
      }
    );
  }

  private isTooWide(left: number, width: number, viewportWidth: number): boolean
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
}
