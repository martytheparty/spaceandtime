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

  private hasBeenInitialized = false;

  componentVisualizationService: ComponentVisualizationService = inject(ComponentVisualizationService);
  
  @ViewChild('viz') rendererViewChild: ElementRef | undefined;

  ngAfterViewInit(): void {
    if (this.rendererViewChild?.nativeElement) {
      this.componentVisualizationService.renderInNativeElement(this.rendererViewChild, this.stRendererInputId());
    }
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
