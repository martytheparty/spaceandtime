import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private materialDict: any = {};

  constructor() {}

  createMaterial(
    id: number 
  ): number
  {
    this.materialDict[id] = new THREE.MeshNormalMaterial();
    return id;
  }

  getMaterialById(id: number): THREE.MeshNormalMaterial
  {
    const material: THREE.MeshNormalMaterial = this.materialDict[id];
    return material;
  }
}
