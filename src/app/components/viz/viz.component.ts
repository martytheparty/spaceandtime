import { 
  AfterViewInit,
  Component,
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

  private hasBeenAttached = false;
  
  @ViewChild('viz') rendererViewChild: ElementRef | undefined;

  constructor() {
    this.stVizComponentId = this.recyclableSequenceService.generateId();;
  }

  ngAfterViewInit(): void {
        if (this.rendererViewChild?.nativeElement) {
          this.rendererViewChild.nativeElement.style.width = `${this.vizWidth()}px`;
          this.rendererViewChild.nativeElement.style.height = `${this.vizHeight()}px`;
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
    // I don't think we should be using the next line... but it breaks the app if it
    // is commented out...
    //this.visualizationService.deleteComponentForId(this.stRendererInputId());
    
    
    this.vizComponentService.deleteVizComponentByStComponentId(this.stVizComponentId);
    this.recyclableSequenceService.recycleId(this.stVizComponentId);
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
