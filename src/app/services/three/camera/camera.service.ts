import { Injectable, inject } from '@angular/core';

import { StTriple } from '../../../interfaces/base/triple/st-triple';
import { ThreePublisherService } from '../publish/three-publisher.service';

import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private threePublisherService: ThreePublisherService = inject(ThreePublisherService);
  private cameraDict: any = {};

  constructor() { }

  createCamera(
    id: number,
    frustrum: number,
    aspectRatio: number,
    near: number,
    far: number
  ): number
  {
    const camera = new THREE.PerspectiveCamera(frustrum, aspectRatio, near, far);

    this.cameraDict[id] = camera;
    return id;
  }

  setCameraPosition(id: number, stPosition: StTriple): number
  {
    const camera: THREE.PerspectiveCamera = this.getCameraById(id);

    camera.position.set(stPosition.stX,stPosition.stY,stPosition.stZ);
    
    return id;
  }

  getCameraById(id: number): THREE.PerspectiveCamera {
    const camera: THREE.PerspectiveCamera = this.cameraDict[id];

    return camera;
  }

  setAspectRatio(stRendererId: number, camera: THREE.PerspectiveCamera, aspectRatio: number): boolean {
    let set = false;
    if (camera) {
      camera.aspect = aspectRatio;
      camera.updateProjectionMatrix();
      set = true;
      this.threePublisherService.setThreeAspectRatioForStRenderId(stRendererId, aspectRatio);
    }
    return set;
  }
}

