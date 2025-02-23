import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RendererService } from '../../services/three/renderer/renderer.service';

import * as THREE from 'three';
import { StRendererService } from '../../services/st/renderer/st-renderer.service';
import { StRenderer, StVisualization } from '../../interfaces/st';

@Component({
  selector: 'app-viz',
  imports: [],
  templateUrl: './viz.component.html',
  styleUrl: './viz.component.scss'
})
export class VizComponent implements AfterViewInit {

  rendererService: RendererService = inject(RendererService);
  stRendererService: StRendererService = inject(StRendererService);
  rendererId = this.stRendererService.getBaseStRenderer();
  stRenderer: StRenderer = this.stRendererService.getRendererById(this.rendererId);
  renderer: THREE.WebGLRenderer = this.rendererService.getRendererById(this.rendererId);

  @ViewChild('viz') rendererViewChild: ElementRef | undefined;

  ngAfterViewInit(): void {

    const stVisualization: StVisualization = {
      stWidth: 200,
      stHeight: 200,
      stRenderer: this.stRenderer
    };

    if (this.rendererViewChild?.nativeElement) {
      this.renderer.setSize(this.stRenderer.stWidth, this.stRenderer.stHeight);
      this.rendererViewChild.nativeElement.appendChild(this.renderer.domElement);
      this.stRendererService.renderById(this.rendererId);
    }
    }
}
