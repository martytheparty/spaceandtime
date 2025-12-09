import { Injectable, inject } from '@angular/core';

import { StTriple } from '../../../../interfaces/base/triple/st-triple';
import { ThreePublisherService } from '../publish/three-publisher.service';

import * as THREE from 'three';
import { ThreeCameraDictionary } from '../../../../interfaces/base/dictionary/base-dicts';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private threePublisherService: ThreePublisherService = inject(ThreePublisherService);
  private cameraDict: ThreeCameraDictionary = {};

  constructor() { }

  createThreeJsCamera(
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
    // In the future we will probably need multiple cameras for the same
    // StCameraId
    const camera: THREE.PerspectiveCamera = this.cameraDict[stCameraId];

    return camera;
  }

  deleteCameraByStCameraId(stCameraId: number): boolean
  {
    // In the future we will probably need multiple cameras for the same
    // StCameraId
    // always returns true unless something very odd happens
    return delete this.cameraDict[stCameraId];
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

