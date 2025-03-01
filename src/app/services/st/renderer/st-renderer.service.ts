import { inject, Injectable } from '@angular/core';
import { 
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
      stCamera: stCamera,
      stScene: stScene,
      threeRenderer: renderer
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

  renderById(stRendererId: number): void
  {
    const stRenderer: StRenderer = this.stRenderersDict[stRendererId]; 
    const threeScene: THREE.Scene = stRenderer.stScene.threeScene as THREE.Scene;
    const threeCamera: THREE.PerspectiveCamera = stRenderer.stCamera.threeCamera as THREE.PerspectiveCamera;
    this.rendererService.renderRenderer(stRendererId, threeScene, threeCamera);
  }
}
