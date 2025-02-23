import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class SceneService {

  private sceneDict: any = {};

  constructor() { }

  createScene(id: number): number
  {
    this.sceneDict[id] = new THREE.Scene();
    return id;
  }

  addMeshToScene(id: number, mesh: THREE.Mesh): number
  {
    const scene: THREE.Scene = this.getSceneById(id);

    scene.add(mesh);

    return id;
  }

  getSceneById(id: number): THREE.Scene {
    const scene: THREE.Scene = this.sceneDict[id];
    return scene;
  }

}
