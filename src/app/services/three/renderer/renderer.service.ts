import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class RendererService {

  private renderersDict: any = {};

  constructor() { }

  createRenderer(id: number): number
  {
    this.renderersDict[id] = new THREE.WebGLRenderer( { antialias: true } );
    return id;
  }

  getRendererById(id: number): THREE.WebGLRenderer {
    return this.renderersDict[id];
  }

  setAnimationFunctionForStId(stId: number, fun: () => void) {
    const renderer: THREE.WebGLRenderer = this.getRendererById(stId);
    renderer.setAnimationLoop(fun);
  }

  renderRenderer(
    id: number,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera
  ): void
  {
    const renderer: THREE.WebGLRenderer = this.renderersDict[id];

    if(renderer) {
      renderer.render(scene, camera);
    }

  }

  deleteRendererById(stId: number): boolean {
    const renderer: THREE.WebGLRenderer = this.renderersDict[stId];

    if (renderer) {
      // stops animation
      renderer.setAnimationLoop(null);
      renderer.dispose();
    }


    const result =  delete this.renderersDict[stId]; 
    return result;

  }
}
