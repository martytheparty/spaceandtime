import { VizComponent } from "../../../components/viz/viz.component";
import { StVisualization } from "../../../interfaces/st";
import { VizComponentService } from "../../angular/viz-component.service";
import { VisualizationService } from "../../entities/visualization/visualization.service";

export class VizComponentLayoutClass {

  updateVisualizationLayout(
    vizCount: number,
    visualizationService: VisualizationService,
    vizComponentService: VizComponentService
  ): number
  {
    if(vizCount > 0) {
      this.visualizationsLayout(
        visualizationService, 
        vizComponentService,
        true);
    }
    return vizCount;
  }

  visualizationsLayout(
    visualizationService: VisualizationService,
    vizComponentService: VizComponentService,
    ignoreHash = false): void
  {
    // console.log("visualizationsLayout");
    if (
      visualizationService.visualizationHashValue !== visualizationService.renderedLayoutHash
      || ignoreHash
    ) {
      // this function runs around 60 times per second
      // avoid doing any calculations in this function
      visualizationService
            .getStVisualizations()
              .forEach((stVisualization: StVisualization) => {
                this.setPosition(stVisualization, vizComponentService);
              });
      
      visualizationService.renderedLayoutHash = visualizationService.visualizationHashValue;
    }
  }

  // move this function to the utilities -> positioning -> vizComponentLayoutClass
  setPosition(
    stVisualization: StVisualization,
    vizComponentService: VizComponentService
  ): void
  {
    const vizComponent = vizComponentService.getVizComponentByStComponentId(stVisualization.stVizComponentId);
    //this.setPostionForVizComponent(vizComponent, stVisualization);
    this.setPostionForVizComponent(vizComponent, stVisualization);
  }

  setPostionForVizComponent(vizComponent: VizComponent, stVisualization: StVisualization): boolean
  {
    let wasSet = false;
    if (vizComponent?.rendererViewChild?.nativeElement) {
      console.log("This is were we set the left and top!");
      const ele: HTMLDivElement = vizComponent?.rendererViewChild.nativeElement.parentElement;
      ele.style.left = stVisualization.stLeft.toString() + 'px';
      ele.style.top = stVisualization.stTop.toString() + 'px';
      wasSet = true;
    }
    return wasSet;
  }

}
