import { 
          Injectable,
          inject
        } from '@angular/core';

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
        } from '../../../interfaces/st';

import { RendererService } from '../three/renderer/renderer.service';
import { SceneService } from '../three/scene/scene.service';
import { CameraService } from '../three/camera/camera.service';
import { RecyclableSequenceService } from '../../utilities/general/recyclable-sequence-service.service';
import { VisualizationService } from '../visualization/visualization.service';
import { StSceneService } from '../st/scene/st-scene.service';
import { StMeshService } from '../st/mesh/st-mesh.service';
import { VizComponentService } from '../../angular/viz-component.service';
import { VizComponent } from '../../../components/viz/viz.component';



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
  stSceneService: StSceneService = inject(StSceneService);
  sceneService: SceneService = inject(SceneService);
  cameraService: CameraService = inject(CameraService);
  stMeshService: StMeshService = inject(StMeshService);

  recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);
  visualizationService: VisualizationService = inject(VisualizationService);
  vizComponentService: VizComponentService = inject(VizComponentService);

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
      const stScene: StScene = this.stSceneService.getSceneById(stRenderer.stSceneId);

      if(stRenderer.deleted) {
        // makes the unit test unusable
        console.log("ERROR: Trying to render a deleted renderer");
      } else {

        const stMeshIds: number[] = stScene.stMeshIds;
        
        stMeshIds.forEach( (
          stMeshId: number
        ) => {
          const stMesh: StMesh = this.stMeshService.getMeshById(stMeshId);
          const animations: StAnimation[] = stMesh.stAnimations;
          animations.forEach( (animation: StAnimation) => {
            if (stMesh.threeMesh) {
              this.updatePropertyForAnimation(stMesh.threeMesh, animation)
            }
          } );
        } );

        const scene: THREE.Scene = this.sceneService.getSceneById(stScene.stSceneId);
        const camera: THREE.PerspectiveCamera = this.cameraService.getCameraByStCameraId(stRenderer.stCameraId); 

        this.rendererService.renderRenderer(stRenderer.stRendererId, scene, camera);
      }
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
    // console.log("visualizationsLayout");
    if (
      this.visualizationService.visualizationHashValue !== this.visualizationService.renderedLayoutHash
      || ignoreHash
    ) {
      // this function runs around 60 times per second
      // avoid doing any calculations in this function
      this.visualizationService
            .getStVisualizations()
              .forEach(this.setPosition.bind(this));
      
      this.visualizationService.renderedLayoutHash = this.visualizationService.visualizationHashValue;
    }
  }

  setPosition(stVisualization: StVisualization): void
  {
    const vizComponent = this.vizComponentService.getVizComponentByStComponentId(stVisualization.stVizComponentId);
    this.setPostionForVizComponent(vizComponent, stVisualization);
  }

  setPostionForVizComponent(vizComponent: VizComponent, stVisualization: StVisualization): boolean
  {
    let wasSet = false;
    if (vizComponent?.rendererViewChild?.nativeElement) {
      console.log("This is were we set the left and top!");
      const ele: HTMLDivElement = vizComponent?.rendererViewChild?.nativeElement.parentElement;
      ele.style.left = stVisualization.stLeft.toString() + 'px';
      ele.style.top = stVisualization.stTop.toString() + 'px';
    }
    return wasSet;
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

    const stScene: StScene = this.stSceneService.getSceneById(stRenderer.stSceneId);
    const stMeshId = stScene.stMeshIds[0];
    const stMesh: StMesh = this.stMeshService.getMeshById(stMeshId);

    if (modulus === 0) {
      const mesh = stMesh;
      this
        .addAnimation(
          mesh,
          'mesh-rotation-x',
          'infinite',
          'continous',
          0,
          [.05]);
    } else if(modulus === 1) {
      const mesh = stMesh;
      this
        .addAnimation(
          mesh,
          'mesh-rotation-y',
          'infinite',
          'continous',
          0,
          [.05]);
    } else if(modulus === 2) {
      const mesh = stMesh;
      this
        .addAnimation(
          mesh,
          'mesh-rotation-z',
          'infinite',
          'continous',
          0,
          [.05]);
    } else if(modulus === 3) {
      const mesh = stMesh;
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

  updateVisualizationLayout(vizCount: number): number
  {
    if(vizCount > 0) {
      this.visualizationsLayout(true);
    }
    return vizCount;
  }
}
