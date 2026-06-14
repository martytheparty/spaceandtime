import { 
  inject,
  signal,
  Injectable,
  WritableSignal
} from '@angular/core';
import * as THREE from 'three';
import { ThreeMaterialDictionary } from '../../../../../interfaces/base/dictionary/base-dicts';
import { HashService } from '../../../../utilities/general/hash.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  hashService: HashService = inject(HashService);
  private materialDict: ThreeMaterialDictionary = {};
  publicMaterialDictionary: WritableSignal<ThreeMaterialDictionary> = signal<ThreeMaterialDictionary>(this.materialDict);
  // dictionary hash
  publicMaterialDictionaryHash: WritableSignal<string> = signal<string>(""); 


  constructor() {}

  createMaterial(
    stId: number 
  ): number
  {
    this.materialDict[stId] = new THREE.MeshNormalMaterial();
    this.publishMaterialDictionary();
    return stId;
  }

  getMaterialById(stId: number): THREE.MeshNormalMaterial
  {
    const material: THREE.MeshNormalMaterial = this.materialDict[stId];
    return material;
  }

  publishMaterialDictionary(): boolean
  {
    const dictionaryJSON = JSON.stringify(this.materialDict);
    let dictionaryHash: string = "";
    const hashPromise = this.hashService.getHashString(dictionaryJSON);
    this.publicMaterialDictionary.set(this.materialDict);

    hashPromise.then( (result: string) => {
      dictionaryHash = result;

      // publish new hash value
      this.publicMaterialDictionaryHash.set(dictionaryHash);
    } );

    return true;
  }

  deleteMaterialByStMaterialId(stMaterialId: number): boolean
  {
    // always returns true unless something very odd happens
    this.publishMaterialDictionary();
    return delete this.materialDict[stMaterialId];
  }
}
