import { 
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  ViewChild
} from '@angular/core';

import { ComponentVisualizationService } from './viz.service';

@Component({
  selector: 'app-viz',
  imports: [],
  templateUrl: './viz.component.html',
  styleUrl: './viz.component.scss'
})
export class VizComponent implements AfterViewInit {

  stRendererInputId = input.required<number>();

  hasBeenInitialized = false;

  componentVisualizationService: ComponentVisualizationService = inject(ComponentVisualizationService);
  
  @ViewChild('viz') rendererViewChild: ElementRef | undefined;

  ngAfterViewInit(): void {
    if (this.rendererViewChild?.nativeElement) {
      this.componentVisualizationService.renderInNativeElement(this.rendererViewChild, this.stRendererInputId());
    }
  }

  setAsInitialized(): void
  {
    this.hasBeenInitialized = true;
  }
}
