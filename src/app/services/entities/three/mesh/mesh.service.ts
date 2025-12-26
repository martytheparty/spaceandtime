import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { ThreeMeshDictionary } from '../../../../interfaces/base/dictionary/base-dicts';

@Injectable({
  providedIn: 'root'
})
export class MeshService {

  private meshDict: ThreeMeshDictionary = {};

  constructor() {}

  createMesh(
    id: number 
  ): number
  {
    this.meshDict[id] = new THREE.Mesh();
    return id;
  }

  updateMeshMaterial(
    id: number,
    material: THREE.MeshNormalMaterial,
    dispose = true // there may be instances where disposing is not desired
  ): number
  {
    const mesh: THREE.Mesh = this.getMeshById(id);

    if (mesh.material && dispose) {
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach(this.dispose)
      } else {
        this.dispose(mesh.material);
      }
    }

    mesh.material = material;

    return id;
  }

  dispose(mat: any): void {
    const material: THREE.MeshNormalMaterial = mat;
    mat.dispose(); // call this if the material is not being used in the app
  }

  updateMeshGeometry(
    id: number,
    geometry: THREE.BoxGeometry,
    dispose = true // there may be instances where disposing is not desired
  ): number
  {
    const mesh: THREE.Mesh = this.getMeshById(id);

    if (mesh.geometry && dispose) {
      mesh.geometry.dispose(); // call this if the material is not being used in the app
    }

    mesh.geometry = geometry;

    return id;
  }

  getMeshById(id: number): THREE.Mesh
  {
    const mesh: THREE.Mesh = this.meshDict[id];
    return mesh;
  }
}