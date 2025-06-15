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
  styleUrl: './viz.component.scss'
})
export class VizComponent implements AfterViewInit, OnDestroy {


  componentVisualizationService: ComponentVisualizationService = inject(ComponentVisualizationService);
  visualizationService: VisualizationService = inject(VisualizationService);

  stRendererInputId = input.required<number>();

  private hasBeenInitialized = false;


  
  @ViewChild('viz') rendererViewChild: ElementRef | undefined;

  ngAfterViewInit(): void {
    if (this.rendererViewChild?.nativeElement) {
      this.componentVisualizationService.renderInNativeElement(this.rendererViewChild, this.stRendererInputId());
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
