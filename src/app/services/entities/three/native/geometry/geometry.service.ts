import { 
  inject,
  signal,
  Injectable,
  WritableSignal
} from '@angular/core';
import * as THREE from 'three';
import { StTriple } from '../../../../../interfaces/base/triple/st-triple';
import { ThreeGeometryDictionary } from '../../../../../interfaces/base/dictionary/base-dicts';
import { HashService } from '../../../../utilities/general/hash.service';



@Injectable({
  providedIn: 'root'
})
export class GeometryService {

  private hashService: HashService = inject(HashService);
  
  private geometryDict: ThreeGeometryDictionary = {};

  publicGeometryDictionary: WritableSignal<ThreeGeometryDictionary> = signal<ThreeGeometryDictionary>(this.geometryDict);
  // dictionary hash
  publicGeometryDictionaryHash: WritableSignal<string> = signal<string>(""); 


  constructor() { }

    createGeometry(
      stGeometryId: number 
    ): number
    {
      this.geometryDict[stGeometryId] = new THREE.BoxGeometry();
      return stGeometryId;
    }

    setDimensions(stGeometryId: number, dimensions: StTriple): number
    {
      // to update the size we need to create a new geometry
      const geometry: THREE.BoxGeometry =  new THREE.BoxGeometry(
        dimensions.stX, 
        dimensions.stY,
        dimensions.stZ
      );
      this.geometryDict[stGeometryId] = geometry;
      return stGeometryId;
    }
  
    getGeometryByStGeometryId(stGeometryId: number): THREE.BoxGeometry
    {
      const geometry: THREE.BoxGeometry = this.geometryDict[stGeometryId];
      return geometry;
    }

    publishGeometryDictionary(): boolean
    {
      const dictionaryJSON = JSON.stringify(this.geometryDict);
      let dictionaryHash: string = "";
      const hashPromise = this.hashService.getHashString(dictionaryJSON);
      this.publicGeometryDictionary.set(this.geometryDict);

      hashPromise.then( (result: string) => {
        dictionaryHash = result;

        // publish new hash value
        this.publicGeometryDictionaryHash.set(dictionaryHash);
      } );

      return true;
    }

  deleteGeometryByStGeometryId(stGeometryId: number): boolean
  {
    // always returns true unless something very odd happens
    this.publishGeometryDictionary();
    return delete this.geometryDict[stGeometryId];
  }
}
