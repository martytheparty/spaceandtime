import { 
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  ViewChild
} from '@angular/core';

import { ComponentVisualizationService } from './viz.service';
import { VisualizationService } from '../../services/entities/visualization/visualization.service';
import { RecyclableSequenceService } from '../../services/utilities/general/recyclable-sequence-service.service';
import { VizComponentService } from '../../services/angular/viz-component.service';

@Component({
  selector: 'app-viz',
  imports: [],
  templateUrl: './viz.component.html',
  styleUrl: './viz.component.scss',
  providers: [ComponentVisualizationService]
})
export class VizComponent implements AfterViewInit, OnDestroy {


  // service that provcides functionality for THIS instance of a viz component.
  componentVisualizationService: ComponentVisualizationService = inject(ComponentVisualizationService);
  // service that operates accross ALL viz components.
  vizComponentService: VizComponentService = inject(VizComponentService);
  visualizationService: VisualizationService = inject(VisualizationService);
  recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);

  stRendererInputId = input.required<number>();
  stVizComponentId: number;

  vizWidth = input<number>(200);
  vizHeight = input<number>(200);
  oldWidth = 0;
  oldHeight = 0;

  private hasBeenAttached = false;
  
  @ViewChild('viz') rendererViewChild: ElementRef | undefined;

  constructor() {
    this.stVizComponentId = this.recyclableSequenceService.generateId();

    effect(() => {
      const updated = this.updateDimensionsSignalHandler(
        this.rendererViewChild,
        this.vizWidth(),
        this.vizHeight(),
        this.oldWidth,
        this.oldHeight,
        this.stRendererInputId()
      );

      this.updateOld(updated, this.vizWidth(), this.vizHeight());
    })
  }

  ngAfterViewInit(): void {
        if (this.rendererViewChild?.nativeElement) {
          const nativeElement: HTMLDivElement = this.rendererViewChild.nativeElement;
          const width = this.vizWidth();
          const height = this.vizHeight();

          this.updateDimensions(nativeElement, width, height, 0, 0); // does not seem to be needed
          // this is where the element is actually created
          this.componentVisualizationService.renderInNativeElement(
            this.rendererViewChild,
            this.stRendererInputId(),
            this.vizWidth(),
            this.vizHeight()
          );
        }
        this.visualizationService.calculatePositions();
  }

  ngOnDestroy(): void {    
    this.vizComponentService.deleteVizComponentByStComponentId(this.stVizComponentId);
    this.recyclableSequenceService.recycleId(this.stVizComponentId);
  }

  updateOld(updated: boolean, width: number, height: number): boolean{
      if (updated) {
        this.oldWidth = width;
        this.oldHeight = height;
      }
      return updated;
  }

  updateDimensionsSignalHandler(
    rendererViewChild: ElementRef | undefined,
    newWidth: number,
    newHeight: number,
    currentWidth: number,
    currentHeight: number,
    stRendererInputId: number
  ): boolean {
    let updated = false;
    if (rendererViewChild) {
      const nativeElement: HTMLDivElement = rendererViewChild.nativeElement;
      this.updateDimensions(nativeElement, newWidth, newHeight, currentWidth, currentHeight);
      this.componentVisualizationService.renderInNativeElement(
              rendererViewChild,
              stRendererInputId,
              newWidth,
              newHeight
            );
      updated = true;
    }
    return updated;
  }

  updateDimensions(
    nativeElement: HTMLDivElement, 
    newWidth: number,
    newHeight: number,
    currentWidth: number,
    currentHeight: number
  ): boolean
  {
    let changed = false;

    if (
      newHeight !== currentHeight
      || newWidth !== currentWidth 
    ) {
        changed = true;
        // updates the native element on the next frame
        requestAnimationFrame(() => {
          nativeElement.style.width = `${newWidth}px`;
          nativeElement.style.height = `${newHeight}px`;          
        })
    }

    return changed;
  }

  setAsAttached(): boolean
  {
    this.hasBeenAttached = true;

    return this.isAttached();
  }

  isAttached(): boolean
  {
    return this.hasBeenAttached;
  }
}
