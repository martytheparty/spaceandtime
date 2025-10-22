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
import { VisualizationService } from '../../services/visualization/visualization.service';

@Component({
  selector: 'app-viz',
  imports: [],
  templateUrl: './viz.component.html',
  styleUrl: './viz.component.scss',
   providers: [ComponentVisualizationService]
})
export class VizComponent implements AfterViewInit, OnDestroy {


  componentVisualizationService: ComponentVisualizationService = inject(ComponentVisualizationService);
  visualizationService: VisualizationService = inject(VisualizationService);

  stRendererInputId = input.required<number>();

  vizWidth = input<number>(200);
  vizHeight = input<number>(200);

  private hasBeenInitialized = false;
  
  @ViewChild('viz') rendererViewChild: ElementRef | undefined;

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
  }

  ngOnDestroy(): void {
    this.visualizationService.deleteComponentForId(this.stRendererInputId());
  }

  setAsInitialized(): boolean
  {
    this.hasBeenInitialized = true;

    return this.isInitialized();
  }

  isInitialized(): boolean
  {
    return this.hasBeenInitialized;
  }
}
