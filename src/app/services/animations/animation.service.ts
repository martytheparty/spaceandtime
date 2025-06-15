import { 
          Injectable,
          inject
        } from '@angular/core';

import { 
          NavigationEnd,
          Router,
          Event as RouterEventTypes
        } from '@angular/router';

import { Subscription } from 'rxjs';

import * as THREE from 'three';

import { 
          AnimatableObjects,
          RedrawTypes,
          StAnimation,
          StMesh,
          StRenderer,
          StScene,
          StVisualization,
          SupportedStTypes,
          TemporalTypes,
          ThreePathAliasType
        } from '../../interfaces/st';

import { RendererService } from '../three/renderer/renderer.service';
import { SceneService } from '../three/scene/scene.service';
import { CameraService } from '../three/camera/camera.service';
import { RecyclableSequenceService } from '../utilities/recyclable-sequence-service.service';
import { VisualizationService } from '../visualization/visualization.service';



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
  visualizationService: VisualizationService = inject(VisualizationService);

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

  visualizationsLayout(ignoreHash = false): void
  {
    if (
      this.visualizationService.visualizationHashValue !== this.visualizationService.renderedLayoutHash
      || ignoreHash
    ) {
      // this function runs around 60 times per second
      // avoid doing any calculations in this function
      this.visualizationService.visualizations.forEach(this.setPosition);
      this.visualizationService.renderedLayoutHash = this.visualizationService.visualizationHashValue;
    }
  }

  setPosition(viz: StVisualization): void
  {
    if (viz.vizComponent?.rendererViewChild?.nativeElement) {
      const ele: HTMLDivElement = viz.vizComponent?.rendererViewChild?.nativeElement.parentElement;
      ele.style.left = viz.stLeft.toString() + 'px';
      ele.style.top = viz.stTop.toString() + 'px';
    }
  }

  animatateVisualization(stRenderer: StRenderer, index: number): boolean {
    const modulus = index%4;
    this.animateMesh(stRenderer, modulus);

    return true;
  }

  animateVisualizations(stRenderers: StRenderer[]): void {
    stRenderers.forEach(this.animatateVisualization.bind(this));
  }

  animateMesh(stRenderer: StRenderer, modulus: number): boolean {

    if (modulus === 0) {
      const mesh = stRenderer.stScene.stMeshes[0];
      this
        .addAnimation(
          mesh,
          'mesh-rotation-x',
          'infinite',
          'continous',
          0,
          [.05]);
    } else if(modulus === 1) {
      const mesh = stRenderer.stScene.stMeshes[0];
      this
        .addAnimation(
          mesh,
          'mesh-rotation-y',
          'infinite',
          'continous',
          0,
          [.05]);
    } else if(modulus === 2) {
      const mesh = stRenderer.stScene.stMeshes[0];
      this
        .addAnimation(
          mesh,
          'mesh-rotation-z',
          'infinite',
          'continous',
          0,
          [.05]);
    } else if(modulus === 3) {
      const mesh = stRenderer.stScene.stMeshes[0];
      this
        .addAnimation(
          mesh,
          'mesh-rotation-x',
          'infinite',
          'continous',
          0,
          [.05]);

        this
          .addAnimation(
            mesh,
            'mesh-rotation-y',
            'infinite',
            'continous',
            0,
            [.05]);

        this
          .addAnimation(
            mesh,
            'mesh-rotation-z',
            'infinite',
            'continous',
            0,
            [.05]);
    }

    return true;
  }
}
