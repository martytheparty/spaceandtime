import {
  inject,
  signal,
  Injectable,
  WritableSignal
} from '@angular/core';
import * as THREE from 'three';
import { ThreeSceneDictionary } from '../../../../../interfaces/base/dictionary/base-dicts';
import { HashService } from '../../../../utilities/general/hash.service';

@Injectable({
  providedIn: 'root'
})
export class SceneService {

  hashService: HashService = inject(HashService);

  sceneDict: ThreeSceneDictionary = {};

  publicSceneDictionary: WritableSignal<ThreeSceneDictionary>
                                      = signal<ThreeSceneDictionary>(this.sceneDict);
  publicSceneDictionaryHash: WritableSignal<string> = signal<string>("");

  constructor() { }

  createScene(stSceneId: number): number
  {
    this.sceneDict[stSceneId] = new THREE.Scene();

    this.publishSceneDictionary();

    return stSceneId;
  }

  addMeshToScene(stSceneId: number, mesh: THREE.Mesh): number
  {
    const scene: THREE.Scene = this.getSceneById(stSceneId);

    scene.add(mesh);

    this.publishSceneDictionary();

    return stSceneId;
  }

  getSceneById(stSceneId: number): THREE.Scene {
    const scene: THREE.Scene = this.sceneDict[stSceneId];
    return scene;
  }

  publishSceneDictionary(): boolean
  {
    const dictionaryJSON = JSON.stringify(this.sceneDict);
    let dictionaryHash: string = "";
    const hashPromise = this.hashService.getHashString(dictionaryJSON);
    this.publicSceneDictionary.set(this.sceneDict);

    hashPromise.then( (result: string) => {
      dictionaryHash = result;

      // publish new hash value
      this.publicSceneDictionaryHash.set(dictionaryHash);
    } );

    return true;
  }

  deleteSceneById(stId: number): boolean {
    const result =  delete this.sceneDict[stId]; 
    return result;
  }  

}
