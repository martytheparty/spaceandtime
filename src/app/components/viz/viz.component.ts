import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';

import { StAnimation, StMesh, StRenderer, StVisualization } from '../../interfaces/st';

import { RendererService } from '../../services/three/renderer/renderer.service';
import { StRendererService } from '../../services/st/renderer/st-renderer.service';
import { AnimationService } from '../../services/animations/animation.service';

import * as THREE from 'three';

@Component({
  selector: 'app-viz',
  imports: [],
  templateUrl: './viz.component.html',
  styleUrl: './viz.component.scss'
})
export class VizComponent implements AfterViewInit {

  animationService: AnimationService = inject(AnimationService);
  rendererService: RendererService = inject(RendererService);
  stRendererService: StRendererService = inject(StRendererService);
  rendererId = this.stRendererService.getBaseStRenderer();
  stRenderer: StRenderer = this.stRendererService.getRendererById(this.rendererId);
  renderer: THREE.WebGLRenderer = this.rendererService.getRendererById(this.rendererId);

  @ViewChild('viz') rendererViewChild: ElementRef | undefined;

  ngAfterViewInit(): void {

    // hack in some animations into the base mesh...
    this.stRenderer.stScene.stMeshes.forEach(
      (stMesh: StMesh) => {
        const animation1: StAnimation =           { 
          alias: "mesh-rotation-x",
          temporal: 'infinite',
          redraw: 'continous',
          time: 0,
          values: [.05]
        };
        stMesh.stAnimations.push(animation1);
        const animation2: StAnimation =           { 
          alias: "mesh-rotation-y",
          temporal: 'infinite',
          redraw: 'continous',
          time: 0,
          values: [.05]
        };
        stMesh.stAnimations.push(animation2);
      }
    );

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
