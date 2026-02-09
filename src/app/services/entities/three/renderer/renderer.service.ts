import { Injectable, inject } from '@angular/core';
import * as THREE from 'three';
import { SceneService } from '../scene/scene.service';
import { CameraService } from '../camera/camera.service';
import { StRenderer } from '../../../../interfaces/st';

@Injectable({
  providedIn: 'root'
})
export class RendererService {

  private renderersDict: any = {};

  threeSceneService: SceneService = inject(SceneService);
  threeCameraService: CameraService = inject(CameraService);

  constructor() { }

  createRenderer(stRendererId: number): number
  {
    this.renderersDict[stRendererId] = new THREE.WebGLRenderer( { antialias: true } );
    return stRendererId;
  }

  getRendererById(stRendererId: number): THREE.WebGLRenderer {
    return this.renderersDict[stRendererId];
  }

  setAnimationFunctionForStId(stId: number, fun: () => void) {
    const renderer: THREE.WebGLRenderer = this.getRendererById(stId);
    renderer.setAnimationLoop(fun);
  }

  renderRenderer(
    stRendererId: number,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera
  ): void
  {
    const renderer: THREE.WebGLRenderer = this.renderersDict[stRendererId];

    if(renderer) {
      renderer.render(scene, camera);
    }

  }

  renderStRenderer(stRenderer: StRenderer): boolean
  {
    // Gets the THREE Scene
    const scene: THREE.Scene = this.threeSceneService.getSceneById(stRenderer.stSceneId);
    // Gets the THREE Camera
    const camera: THREE.PerspectiveCamera = this.threeCameraService.getCameraByStCameraId(stRenderer.stCameraId); 
    this.renderRenderer(stRenderer.stRendererId, scene, camera);

    return true;
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
