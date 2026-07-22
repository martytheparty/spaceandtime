import * as THREE from 'three';
import { AnimatableObjects, StAnimation, StGroup, StRenderer, StScene } from '../../../../interfaces/st';
import { MeshService } from '../native/mesh/mesh.service';
import { StAnimationService } from '../../st/animation/st-animation.service';
import { StSceneService } from '../../st/scene/st-scene.service';
import { RendererService } from '../native/renderer/renderer.service';
import { StGroupService } from '../../st/group/st-group.service';

export class ThreeAnimationClass {

  
  constructor() {
  } 

  updatePropertyForAnimation(mesh: THREE.Mesh, animation: StAnimation): THREE.Mesh {
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

  updateAnimationsForMeshIds(
    stMeshIds: number[],
    threeMeshService: MeshService,
    stAnimationService: StAnimationService
  ): boolean {
    let updated = false;

    // itterates over each mesh ID
    stMeshIds.forEach( (
       stMeshId: number
     ) => {
      // Gets the mesh from THREE
      const threeMesh: THREE.Mesh = threeMeshService.getMeshByStMeshId(stMeshId);          
      const stAnimations: StAnimation[] = stAnimationService.getStAnimationsForStMeshId(stMeshId);
      updated = this.updateAnimationsForThreeMesh(threeMesh, stAnimations);
     } 
     );

    return updated;
  }

  updateAnimationsForThreeMesh(
    threeMesh: THREE.Mesh,
    stAnimations: StAnimation[]
  ): boolean {
    let updated = false;
      stAnimations.forEach( (animation: StAnimation) => {
        if (threeMesh) {
          // uses THREE to update THREE with animation
          this.updatePropertyForAnimation(threeMesh, animation);
          updated = true;
        }
      } );
    return updated;
  }

  updateAnimationsForRenderer(
    stRenderer: StRenderer,
    stSceneService: StSceneService,
    stGroupService: StGroupService,
    threeMeshService: MeshService,
    stAnimationService: StAnimationService,
    threeRendererService: RendererService
  ): boolean {
    let rendered = true;
    // gets scene from ST
    const stScene: StScene = stSceneService.getSceneById(stRenderer.stSceneId);
    const stGroupIds: number[] = stScene.stGroupIds;
    const stGroupId: number = stGroupIds[0];
    const stGroup: StGroup = stGroupService.getStGroupById(stGroupId);

    // get mesh IDs from ST
    const stMeshIds: number[] = stGroup.stMeshIds;

    this.updateAnimationsForMeshIds(
      stMeshIds,
      threeMeshService,
      stAnimationService,
    );

    threeRendererService.renderStRenderer(stRenderer);

    return rendered;

  }

  createAnimationFunctionForStrenderer(
    stRenderer: StRenderer,
    stSceneService: StSceneService,
    stGroupService: StGroupService,
    threeMeshService: MeshService,
    stAnimationService: StAnimationService,
    threeRendererService: RendererService
  ): () => void {

    return (): void => {
        this.updateAnimationsForRenderer(
          stRenderer,
          stSceneService,
          stGroupService,
          threeMeshService,
          stAnimationService,
          threeRendererService,
        );
    }
  }
  
}
