import { 
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  ViewChild
} from '@angular/core';

import { StRenderer } from '../../interfaces/st';

import { RendererService } from '../../services/three/renderer/renderer.service';
import { StRendererService } from '../../services/st/renderer/st-renderer.service';

import * as THREE from 'three';
import { ComponentVisualizationService } from './visualization.service';

@Component({
  selector: 'app-viz',
  imports: [],
  templateUrl: './viz.component.html',
  styleUrl: './viz.component.scss'
})
export class VizComponent implements AfterViewInit {

  stRendererInputId = input.required<number>();

  rendererService: RendererService = inject(RendererService);
  stRendererService: StRendererService = inject(StRendererService);

  componentVisualizationService: ComponentVisualizationService = inject(ComponentVisualizationService);
  
  @ViewChild('viz') rendererViewChild: ElementRef | undefined;

  ngAfterViewInit(): void {

    if (this.rendererViewChild?.nativeElement) {
      this.componentVisualizationService.renderInNativeElement(this.rendererViewChild, this.stRendererInputId());
    }
  }
}
