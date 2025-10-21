import { inject, Injectable } from '@angular/core';
import { 
  CalculatedValues,
  StCamera,
  StRenderer,
  StScene
} from '../../../interfaces/st';

import { StCameraService } from '../camera/st-camera.service';
import { RecyclableSequenceService } from '../../utilities/recyclable-sequence-service.service';

import { RendererService } from '../../three/renderer/renderer.service'

import * as THREE from 'three';
import { StSceneService } from '../scene/st-scene.service';
import { AnimationService } from '../../animations/animation.service';
import { CameraService } from '../../three/camera/camera.service';
import { StPublisherService } from '../publish/st-publisher.service';

@Injectable({
  providedIn: 'root'
})
export class StRendererService {

  private stCameraService: StCameraService = inject(StCameraService);
  private stSceneService: StSceneService = inject(StSceneService);
  private animationService: AnimationService = inject(AnimationService);

  private recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);
  private stRenderersDict: any = {};
  private rendererService: RendererService = inject(RendererService);
  private threeCameraService: CameraService = inject(CameraService);
  private stPublisherService: StPublisherService = inject(StPublisherService);

  constructor() { }

  getBaseStRenderer(): number
  {
    const stRendererId = this.recyclableSequenceService.generateId();
    this.rendererService.createRenderer(stRendererId);
    const renderer: THREE.WebGLRenderer = this.rendererService.getRendererById(stRendererId);

    const startWidth = 200;
    const startHeight = 200;
    const startAspect = 1;


    const stCameraId = this.stCameraService.createBaseCamera(startAspect);
    const stCamera: StCamera = this.stCameraService.getCameraById(stCameraId);

    // two lines for scene

    const stSceneId = this.stSceneService.createBaseScene();
    const stScene: StScene = this.stSceneService.getSceneById(stSceneId);

    const stRenderer: StRenderer = { 
      stRendererId,
      stWidth: startWidth, 
      stHeight: startHeight,
      stCameraId: stCamera.stCameraId,
      stScene: stScene,
      threeRenderer: renderer,
      deleted: false
    };
    
    const rendererFunction: () => void = this.animationService.createAnimationFunctionForId(stRenderer);
    this.rendererService.setAnimationFunctionForStId(stRendererId, rendererFunction);

    this.stRenderersDict[stRendererId] = stRenderer;

    return stRendererId;
  }

  getRendererById(id: number): StRenderer
  {
    return this.stRenderersDict[id];
  }

  renderById(stRendererId: number, element: HTMLDivElement): boolean
  {
    let rendered = false;

    const stRenderer: StRenderer = this.stRenderersDict[stRendererId]; 

    if (stRenderer) {
      const threeScene: THREE.Scene = stRenderer.stScene.threeScene as THREE.Scene;
      const threeCamera: THREE.PerspectiveCamera | undefined = this.getThreeCameraByStRendererId(stRendererId);
      if (threeCamera) {
        // think about how to add logic that sends the stored ar instead fo the element
        // width and height.
        this.updateAspectRatioByIdForWidthAndHeight(stRendererId, element.offsetWidth, element.offsetHeight);
        this.rendererService.renderRenderer(stRendererId, threeScene, threeCamera);
        rendered = true;
      }
    }
    return rendered;
  }

  updateAspectRatioByIdForWidthAndHeight(
    stRendererId: number,
    width: number,
    height: number
  ): boolean {
    let updated = false;

    const stRenderer: StRenderer | undefined = this.stRenderersDict[stRendererId];

    if (stRenderer)
    {
      const threeCamera = this.getThreeCameraByStRendererId(stRenderer.stRendererId);

      if (threeCamera) {
        const aspectRatio = this.stCameraService.getAspectRatio(width, height);

        // #1 Publish to the Calculated AR to the UI 
        // this.stPublisherService.setCalculatedAspectRatio(stRendererId, aspectRatio);
        this.publishCalculatedAspectRation(stRendererId, aspectRatio)

        // #2 Storing the Calcuated AR for ST
        stRenderer.calculatedValues 
        = this.getCalculatedValuesObjectForCalculatedArChange(stRenderer.calculatedValues, aspectRatio);

        // #3 Telling ThreeJS to update the AR
        this.threeCameraService.setAspectRatio(stRendererId, threeCamera, width/height);

        updated = true;
      }      
    }

    return updated;
  }

  getCalculatedValuesObjectForCalculatedArChange(
    calculatedValues: CalculatedValues | undefined,
    aspectRatio: number
  ): CalculatedValues 
  {
      if(calculatedValues) {
        calculatedValues.aspectRatio = aspectRatio
      } else {
        calculatedValues = { aspectRatio };
      }

      return calculatedValues;
  }

  publishCalculatedAspectRation(stRendererId: number, aspectRatio: number): boolean {
    this.stPublisherService.setCalculatedAspectRatio(stRendererId, aspectRatio);
    return true;
  }

  getThreeCameraByStRendererId(stRendererId: number): THREE.PerspectiveCamera | undefined {
    let threeCamera: THREE.PerspectiveCamera | undefined = undefined;
    const stRenderer: StRenderer | undefined = this.stRenderersDict[stRendererId]; 
    
    if (stRenderer) {
      const stCameraId = stRenderer.stCameraId;
      const stCamera = this.stCameraService.getCameraById(stCameraId);
      threeCamera = stCamera?.threeCamera; // this will need to be updated when threeCamera does not exist any more.
    }

    return threeCamera;
  }

  getRenderers(): StRenderer[]
  {
    return Object.values(this.stRenderersDict);
  }

  deleteRenderer(stRendererId: number): boolean
  {
    let deleted = false;

    if (this.stRenderersDict[stRendererId]) {
      this.rendererService.deleteRendererById(stRendererId);
      this.stRenderersDict[stRendererId].deleted = true;
      delete this.stRenderersDict[stRendererId];

      deleted = true;
    }


    return deleted;
  }
}