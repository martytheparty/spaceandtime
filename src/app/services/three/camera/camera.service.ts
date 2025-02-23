import { Injectable } from '@angular/core';

import * as THREE from 'three';
import { StTriple } from '../../../interfaces/st';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

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
}

