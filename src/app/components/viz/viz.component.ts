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
import { DebounceService } from '../../services/utilities/timing/debounce.service';

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
  debounceService: DebounceService = inject(DebounceService);

  stRendererInputId = input.required<number>();
  stVizComponentId: number;

  vizWidth = input<number>(200);
  vizHeight = input<number>(200);
  oldWidth = 0;
  oldHeight = 0;
  type = 'viz-component';
  effectCount = 0; // just for debugging
  componentInitialized = false;

  private hasBeenAttached = false;
  
  @ViewChild('viz') rendererViewChild: ElementRef | undefined;

  constructor() {
    this.stVizComponentId = this.recyclableSequenceService.generateStId();

    effect(() => {
      // 1) This effect is triggered by the vizWidth Signal
      // 2) This effect is triggered by the vizHeight Signal
      // 3) This effect is triggered by the stRendererInputId

      this.componentInitialized = this.dimensionChangeHandler(this.componentInitialized);

      this.updateOld(this.componentInitialized, this.vizWidth(), this.vizHeight());
    })
  }

  dimensionChangeHandler(isInitialized: boolean): boolean {
    if (isInitialized) {
        // Edge case - the user resized the UI, but the actual element is wrong at this time
        // so the AR had to be update for the future width.
        this.debounceService.debounce(
          "viz-component-update-dims-redraw",
          () => {
              this.updateDimensionsSignalHandler(
                this.rendererViewChild,
                this.vizWidth(),
                this.vizHeight(),
                this.oldWidth,
                this.oldHeight,
                this.stRendererInputId()
              );

              this.componentVisualizationService
                .setArForWidthAndHeight(
                  this.stRendererInputId(),
                  this.vizWidth(),
                  this.vizHeight()
                )
          },
          100
        )
    } else {
      isInitialized = true;
      this.updateDimensionsSignalHandler(
          this.rendererViewChild,
          this.vizWidth(),
          this.vizHeight(),
          this.oldWidth,
          this.oldHeight,
          this.stRendererInputId()
        );

        this.recyclableSequenceService.associateStObjectToId(this.stVizComponentId, this);
    }
    
    return isInitialized;
  }

  ngAfterViewInit(): void {
        if (this.rendererViewChild?.nativeElement) {
          const nativeElement: HTMLDivElement = this.rendererViewChild.nativeElement;
          const width = this.vizWidth();
          const height = this.vizHeight();

          this.updateDimensions(
            nativeElement, 
            width, 
            height
          );
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
      this.updateDimensions(
        nativeElement, 
        newWidth, 
        newHeight, 
        // currentWidth, 
        // currentHeight
      );
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
    newHeight: number
  ): boolean
  {
    let changed = false;
    console.log("UPDATE DIMENSION is", nativeElement, newWidth, newHeight);
    // console.log("UPDATE DIMENSION was", nativeElement, currentWidth, currentHeight);

    // if (
    //   newHeight !== currentHeight
    //   || newWidth !== currentWidth 
    // ) {
        console.log("************* CHANGED 😊 ****************");
        changed = true;
        // updates the native element on the next frame
        requestAnimationFrame(() => {
          nativeElement.style.width = `${newWidth}px`;
          nativeElement.style.height = `${newHeight}px`;          
        })
    // }

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
