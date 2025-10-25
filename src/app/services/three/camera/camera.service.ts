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
    stCameraId: number,
    frustrum: number,
    aspectRatio: number,
    near: number,
    far: number
  ): number
  {
    const camera = new THREE.PerspectiveCamera(frustrum, aspectRatio, near, far);

    this.cameraDict[stCameraId] = camera;
    return stCameraId;
  }

  setCameraPosition(stCameraId: number, stPosition: StTriple): number
  {
    const camera: THREE.PerspectiveCamera = this.getCameraByStCameraId(stCameraId);

    camera.position.set(stPosition.stX,stPosition.stY,stPosition.stZ);
    
    return stCameraId;
  }

  getCameraByStCameraId(stCameraId: number): THREE.PerspectiveCamera {
    const camera: THREE.PerspectiveCamera = this.cameraDict[stCameraId];

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

