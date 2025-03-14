import { Component, inject } from '@angular/core';

import { VizComponent } from './components/viz/viz.component';
import { AnimationService } from './services/animations/animation.service';
import { RendererService } from './services/three/renderer/renderer.service';
import { StRendererService } from './services/st/renderer/st-renderer.service';
import { StRenderer } from './interfaces/st/three/renderer/st-renderer';

import * as THREE from 'three';
import { StAnimation, StMesh, StVisualization } from './interfaces/st';

@Component({
  selector: 'app-root',
  imports: [
    VizComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  animationService: AnimationService = inject(AnimationService);
  rendererService: RendererService = inject(RendererService);
  stRendererService: StRendererService = inject(StRendererService);

  stRendererIds: number[] = [];

  title = 'Space & Time';

  constructor() {


    this.stRendererIds.push(this.stRendererService.getBaseStRenderer());
    this.stRendererIds.push(this.stRendererService.getBaseStRenderer());
    this.stRendererIds.push(this.stRendererService.getBaseStRenderer());
    this.stRendererIds.push(this.stRendererService.getBaseStRenderer());
    this.stRendererIds.push(this.stRendererService.getBaseStRenderer());
    this.stRendererIds.push(this.stRendererService.getBaseStRenderer());

    // this code does nothing... it is for future growth
    // const stVisualization: StVisualization = {
    //   stWidth: 200,
    //   stHeight: 200,
    //   stRenderer: stRenderer01
    // };
    // this code does nothing... it is for future growth

    this.stRendererIds.forEach(
      (stRendererId: number, index: number) => {
        const stRenderer: StRenderer = this.stRendererService.getRendererById(stRendererId);

        if (index === 0) {
          const mesh = stRenderer.stScene.stMeshes[0];
          this.animationService
            .addAnimation(
              mesh,
              'mesh-rotation-x',
              'infinite',
              'continous',
              0,
              [.05]);
        } else if(index === 1) {
          const mesh = stRenderer.stScene.stMeshes[0];
          this.animationService
            .addAnimation(
              mesh,
              'mesh-rotation-y',
              'infinite',
              'continous',
              0,
              [.05]);
        } else if(index === 2) {
          const mesh = stRenderer.stScene.stMeshes[0];
          this.animationService
            .addAnimation(
              mesh,
              'mesh-rotation-z',
              'infinite',
              'continous',
              0,
              [.05]);
        } else if(index === 3) {
          const mesh = stRenderer.stScene.stMeshes[0];
          this.animationService
            .addAnimation(
              mesh,
              'mesh-rotation-x',
              'infinite',
              'continous',
              0,
              [.05]);

            this.animationService
              .addAnimation(
                mesh,
                'mesh-rotation-y',
                'infinite',
                'continous',
                0,
                [.05]);

            this.animationService
              .addAnimation(
                mesh,
                'mesh-rotation-z',
                'infinite',
                'continous',
                0,
                [.05]);
        }

      }
    );
  }
}
