import { 
  inject,
  signal,
  Injectable,
  WritableSignal
} from '@angular/core';
import * as THREE from 'three';
import { ThreeMeshDictionary } from '../../../../../interfaces/base/dictionary/base-dicts';
import { HashService } from '../../../../utilities/general/hash.service';

@Injectable({
  providedIn: 'root'
})
export class MeshService {
  hashService: HashService = inject(HashService);
  private meshDict: ThreeMeshDictionary = {};
  publicMeshDictionary: WritableSignal<ThreeMeshDictionary> = signal<ThreeMeshDictionary>(this.meshDict);
  // dictionary hash
  publicMeshDictionaryHash: WritableSignal<string> = signal<string>("");

  constructor() {}

  createMesh(
    id: number 
  ): number
  {
    this.meshDict[id] = new THREE.Mesh();
    this.publishMeshDictionary();
    return id;
  }

  updateMeshMaterial(
    id: number,
    material: THREE.MeshNormalMaterial,
    dispose = true // there may be instances where disposing is not desired
  ): number
  {
    const mesh: THREE.Mesh = this.getMeshByStMeshId(id);

    if (mesh.material && dispose) {
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach(this.dispose)
      } else {
        this.dispose(mesh.material);
      }
    }

    mesh.material = material;
    this.publishMeshDictionary();

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
    const mesh: THREE.Mesh = this.getMeshByStMeshId(id);

    if (mesh.geometry && dispose) {
      mesh.geometry.dispose(); // call this if the material is not being used in the app
    }

    mesh.geometry = geometry;
    this.publishMeshDictionary();

    return id;
  }

  getMeshByStMeshId(stMeshId: number): THREE.Mesh
  {
    const mesh: THREE.Mesh = this.meshDict[stMeshId];
    return mesh;
  }

  deleteMeshByStMeshId(stMeshId: number): boolean {
    const deleteResult = delete this.meshDict[stMeshId];
    this.publishMeshDictionary();
    return deleteResult;
  }

  publishMeshDictionary(): boolean
  {
    const dictionaryJSON = JSON.stringify(this.meshDict);
    let dictionaryHash: string = "";
    const hashPromise = this.hashService.getHashString(dictionaryJSON);
    this.publicMeshDictionary.set(this.meshDict);

    hashPromise.then( (result: string) => {
      dictionaryHash = result;

      // publish new hash value
      this.publicMeshDictionaryHash.set(dictionaryHash);
    } );

    return true;
  }
}