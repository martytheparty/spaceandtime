import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { ThreeMaterialDictionary } from '../../../../interfaces/base/dictionary/base-dicts';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private materialDict: ThreeMaterialDictionary = {};

  constructor() {}

  createMaterial(
    stId: number 
  ): number
  {
    this.materialDict[stId] = new THREE.MeshNormalMaterial();
    return stId;
  }

  getMaterialById(stId: number): THREE.MeshNormalMaterial
  {
    const material: THREE.MeshNormalMaterial = this.materialDict[stId];
    return material;
  }
}
