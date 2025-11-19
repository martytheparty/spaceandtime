import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class SceneService {

  private sceneDict: any = {};

  constructor() { }

  createScene(stSceneId: number): number
  {
    this.sceneDict[stSceneId] = new THREE.Scene();
    return stSceneId;
  }

  addMeshToScene(stSceneId: number, mesh: THREE.Mesh): number
  {
    const scene: THREE.Scene = this.getSceneById(stSceneId);

    scene.add(mesh);

    return stSceneId;
  }

  getSceneById(stSceneId: number): THREE.Scene {
    const scene: THREE.Scene = this.sceneDict[stSceneId];
    return scene;
  }

}
