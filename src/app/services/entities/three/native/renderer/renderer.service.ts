import { 
  inject,
  signal,
  Injectable,
  WritableSignal
} from '@angular/core';
import * as THREE from 'three';
import { SceneService } from '../scene/scene.service';
import { CameraService } from '../camera/camera.service';
import { StRenderer } from '../../../../../interfaces/st';
import { 
  ThreeMeshDictionary,
  ThreeRendererDictionary
} from '../../../../../interfaces/base/dictionary/base-dicts';
import { HashService } from '../../../../utilities/general/hash.service';

@Injectable({
  providedIn: 'root'
})
export class RendererService {

  hashService: HashService = inject(HashService);
  private renderersDict: ThreeRendererDictionary = {};

  publicRendererDictionary: WritableSignal<ThreeRendererDictionary>
                                      = signal<ThreeRendererDictionary>(this.renderersDict);
  publicRendererDictionaryHash: WritableSignal<string> = signal<string>("");

  threeSceneService: SceneService = inject(SceneService);
  threeCameraService: CameraService = inject(CameraService);

  constructor() { }

  createRenderer(stRendererId: number): number
  {
    this.renderersDict[stRendererId] = new THREE.WebGLRenderer( { antialias: true } );
    this.publishRendererDictionary();
    return stRendererId;
  }

  getRendererById(stRendererId: number): THREE.WebGLRenderer {
    return this.renderersDict[stRendererId];
  }

  setAnimationFunctionForStId(stId: number, fun: () => void) {
    console.log("TODO", "Determine If Setting The Animation Function Should Result In A PUBLISH");
    // BASICALLY, if the function is visible in the renderer's JSON publish, if not there is no point.
    const renderer: THREE.WebGLRenderer = this.getRendererById(stId);
    renderer.setAnimationLoop(fun);
  }

  renderRenderer(
    stRendererId: number,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera
  ): void
  {
    const renderer: THREE.WebGLRenderer = this.renderersDict[stRendererId];

    if(renderer) {
      renderer.render(scene, camera);
    }

  }

  renderStRenderer(stRenderer: StRenderer): boolean
  {
    // Gets the THREE Scene
    const scene: THREE.Scene = this.threeSceneService.getSceneById(stRenderer.stSceneId);
    // Gets the THREE Camera
    const camera: THREE.PerspectiveCamera = this.threeCameraService.getCameraByStCameraId(stRenderer.stCameraId); 
    this.renderRenderer(stRenderer.stRendererId, scene, camera);

    return true;
  }

  deleteRendererById(stId: number): boolean {
    const renderer: THREE.WebGLRenderer = this.renderersDict[stId];

    if (renderer) {
      // stops animation
      renderer.setAnimationLoop(null);
      renderer.dispose();
    }


    const result =  delete this.renderersDict[stId]; 
    this.publishRendererDictionary();
    return result;
  }

  publishRendererDictionary(): boolean
  {
    const dictionaryJSON = JSON.stringify(this.renderersDict);
    let dictionaryHash: string = "";
    const hashPromise = this.hashService.getHashString(dictionaryJSON);
    this.publicRendererDictionary.set(this.renderersDict);

    hashPromise.then( this.hashPromiseHandler.bind(this) );

    return true;
  }

  hashPromiseHandler(result: string): boolean {

      const dictionaryHash = result;

      // publish new hash value
      this.publicRendererDictionaryHash.set(dictionaryHash);

      return true;
  }

}
