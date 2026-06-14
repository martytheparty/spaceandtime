import { 
  inject,
  signal,
  Injectable,
  WritableSignal
} from '@angular/core';

import { StTriple } from '../../../../../interfaces/base/triple/st-triple';
import { ThreePublisherService } from '../../attribute-publish/three-publisher.service';

import * as THREE from 'three';
import { ThreeCameraDictionary } from '../../../../../interfaces/base/dictionary/base-dicts';
import { HashService } from '../../../../utilities/general/hash.service';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private threePublisherService: ThreePublisherService = inject(ThreePublisherService);
  private hashService: HashService = inject(HashService);
  private cameraDict: ThreeCameraDictionary = {};
  publicCameraDictionary: WritableSignal<ThreeCameraDictionary> = signal<ThreeCameraDictionary>(this.cameraDict);
  // dictionary hash
  publicCameraDictionaryHash: WritableSignal<string> = signal<string>(""); 

  createThreeJsCamera(
    stCameraId: number,
    frustrum: number,
    aspectRatio: number,
    near: number,
    far: number
  ): number
  {
    const camera = new THREE.PerspectiveCamera(frustrum, aspectRatio, near, far);

    this.cameraDict[stCameraId] = camera;
    this.publishCameraDictionary();
    return stCameraId;
  }

  setCameraPosition(stCameraId: number, stPosition: StTriple): number
  {
    const camera: THREE.PerspectiveCamera = this.getCameraByStCameraId(stCameraId);

    camera.position.set(stPosition.stX,stPosition.stY,stPosition.stZ);
    this.publishCameraDictionary();    
    return stCameraId;
  }

  getCameraByStCameraId(stCameraId: number): THREE.PerspectiveCamera {
    // In the future we will probably need multiple cameras for the same
    // StCameraId
    const camera: THREE.PerspectiveCamera = this.cameraDict[stCameraId];

    return camera;
  }

  deleteCameraByStCameraId(stCameraId: number): boolean
  {
    // In the future we will probably need multiple cameras for the same
    // StCameraId
    // always returns true unless something very odd happens
    this.publishCameraDictionary();
    return delete this.cameraDict[stCameraId];
  }

  setAspectRatio(stRendererId: number, camera: THREE.PerspectiveCamera, aspectRatio: number): boolean {
    let set = false;
    if (camera) {
      camera.aspect = aspectRatio; // this changes the dictionary too.
      camera.updateProjectionMatrix();
      set = true;
      this.threePublisherService.setThreeAspectRatioForStRenderId(stRendererId, aspectRatio);
    }
    this.publishCameraDictionary();
    return set;
  }

  publishCameraDictionary(): boolean
  {
    const dictionaryJSON = JSON.stringify(this.cameraDict);
    let dictionaryHash: string = "";
    const hashPromise = this.hashService.getHashString(dictionaryJSON);
    this.publicCameraDictionary.set(this.cameraDict);

    hashPromise.then( (result: string) => {
      dictionaryHash = result;

      // publish new hash value
      this.publicCameraDictionaryHash.set(dictionaryHash);
    } );

    return true;
  }
}

