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

@Injectable({
  providedIn: 'root'
})
export class StRendererService {

  private stCameraService: StCameraService = inject(StCameraService);
  private stSceneService: StSceneService = inject(StSceneService);

  private recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);
  private stRenderersDict: any = {};
  private rendererService: RendererService = inject(RendererService);

  constructor() { }

  getBaseStRenderer(): number
  {
    const rendererId = this.recyclableSequenceService.generateId();
    this.rendererService.createRenderer(rendererId);
    const renderer: THREE.WebGLRenderer = this.rendererService.getRendererById(rendererId);
    const startWidth = 200;
    const startHeight = 200;
    const startAspect = 1;


    const stCameraId = this.stCameraService.createBaseCamera(startAspect);
    const stCamera: StCamera = this.stCameraService.getCameraById(stCameraId);

    // two lines for scene

    const stSceneId = this.stSceneService.createBaseScene();
    const stScene: StScene = this.stSceneService.getSceneById(stSceneId);

    const stRenderer: StRenderer = { 
      stRendererId: rendererId,
      stWidth: startWidth, 
      stHeight: startHeight,
      stCamera: stCamera,
      stScene: stScene,
      threeRenderer: renderer
    };

    this.stRenderersDict[rendererId] = stRenderer;

    return rendererId;
  }

  getRendererById(id: number): StRenderer
  {
    return this.stRenderersDict[id];
  }

  renderById(id: number): void
  {
    const stRenderer: StRenderer = this.stRenderersDict[id]; 
    const threeScene: THREE.Scene = stRenderer.stScene.threeScene as THREE.Scene;
    const threeCamera: THREE.PerspectiveCamera = stRenderer.stCamera.threeCamera as THREE.PerspectiveCamera;

    this.rendererService.renderRenderer(id, threeScene, threeCamera);
  }
}
