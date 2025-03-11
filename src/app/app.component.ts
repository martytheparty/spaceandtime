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
          stRenderer.stScene.stMeshes.forEach(
            (stMesh: StMesh) => {
              const animation1: StAnimation =           { 
                alias: "mesh-rotation-x",
                temporal: 'infinite',
                redraw: 'continous',
                time: 0,
                values: [.05]
              };
              stMesh.stAnimations.push(animation1);
            }
          );
        } else if(index === 1) {
          stRenderer.stScene.stMeshes.forEach(
            (stMesh: StMesh) => {
              const animation2: StAnimation =           { 
                alias: "mesh-rotation-z",
                temporal: 'infinite',
                redraw: 'continous',
                time: 0,
                values: [.05]
              };
              stMesh.stAnimations.push(animation2);
            }
          );
        } else if(index === 2) {
          stRenderer.stScene.stMeshes.forEach(
            (stMesh: StMesh) => {
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
        } else if(index === 3) {
          stRenderer.stScene.stMeshes.forEach(
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
      
              const animation3: StAnimation =           { 
                alias: "mesh-rotation-z",
                temporal: 'infinite',
                redraw: 'continous',
                time: 0,
                values: [.05]
              };
              stMesh.stAnimations.push(animation3);
            }
          );
        }

      }
    );
  }
}
