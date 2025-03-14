import { Injectable, inject } from '@angular/core';

import { AnimatableObjects, RedrawTypes, StAnimation, StMesh, StRenderer, StScene, SupportedStTypes, TemporalTypes, ThreePathAliasType } from '../../interfaces/st';

import { RendererService } from '../three/renderer/renderer.service';
import { SceneService } from '../three/scene/scene.service';
import { CameraService } from '../three/camera/camera.service';

import * as THREE from 'three';
import { RecyclableSequenceService } from '../utilities/recyclable-sequence-service.service';


@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  // all rules are broken in this service because it interacts directly with the 
  // st stuff and the three stuff.

  // injecting the StRedererService causes a browser/runtime error

  // try injecting StRendererService after the drawing logic is removed from app

  // stRenderService: StRendererService = inject(StRendererService);
  rendererService: RendererService = inject(RendererService);
  sceneService: SceneService = inject(SceneService);
  cameraService: CameraService = inject(CameraService);
  recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);

  constructor() { }

  private updatePropertyForAnimation(mesh: THREE.Mesh, animation: StAnimation): THREE.Mesh {
    const animationAlias = animation.alias;
    const path: string[] = animationAlias.split('-');
    const type: AnimatableObjects = path[0] as AnimatableObjects;
    const updateObject: any = mesh;

    if (path.length === 3) {
      const prop1 = path[1];
      const prop2 = path[2];

      updateObject[prop1][prop2] = updateObject[prop1][prop2] + animation.values[0];
    }

    return mesh;
  }

  updateMeshForAnimation(mesh: THREE.Mesh, animation: StAnimation) {
    this.updatePropertyForAnimation(mesh, animation);
    return mesh;  
  }

  createAnimationFunctionForId(stRenderer: StRenderer): () => void {

    return (): void => {

      const stScene: StScene = stRenderer.stScene;
      const stMeshes: StMesh[] = stScene.stMeshes;
      
      stMeshes.forEach( (
        stMesh: StMesh
      ) => {
        const animations: StAnimation[] = stMesh.stAnimations;
        animations.forEach( (animation: StAnimation) => {
          if (stMesh.threeMesh) {
            this.updatePropertyForAnimation(stMesh.threeMesh, animation)
          }
        } );
      } );

      const scene: THREE.Scene = this.sceneService.getSceneById(stRenderer.stScene.stSceneId);
      const camera: THREE.PerspectiveCamera = this.cameraService.getCameraById(stRenderer.stCamera.stCameraId); 

      this.rendererService.renderRenderer(stRenderer.stRendererId, scene, camera)
    }
  }

  addAnimation(
    stObject: SupportedStTypes,
    alias: ThreePathAliasType, 
    temporal: TemporalTypes,
    redraw: RedrawTypes,
    time: number = 0,
    values: number[] = []
  ): number
  {
    const stRendererId = this.recyclableSequenceService.generateId();
    const animation: StAnimation = {
      stId: 1, 
      alias,
      temporal,
      redraw,
      time,
      values
    };

    stObject.stAnimations.push(animation)

    return stRendererId;
  }
}
