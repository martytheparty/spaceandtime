import { inject, Injectable } from '@angular/core';
import { StMeshService } from '../mesh/st-mesh.service';

import * as THREE from 'three';
import { RecyclableSequenceService } from '../../../utilities/general/recyclable-sequence-service.service';
import { StMesh, StScene } from '../../../../interfaces/st';
import { SceneService } from '../../three/scene/scene.service';
import { MeshService } from '../../three/mesh/mesh.service';


@Injectable({
  providedIn: 'root'
})
export class StSceneService {

  private recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);
  private stSceneDict: any = {};

  private sceneService: SceneService = inject(SceneService);
  private stMeshService: StMeshService = inject(StMeshService);
  private threeMeshService: MeshService = inject(MeshService);

  constructor() { }

  createBaseScene(): number
  {
    const sceneId = this.recyclableSequenceService.generateStId();

    const stScene: StScene = {
      type: 'st-scene',
      stSceneId: sceneId,
      stMeshIds: []
    };

    const baseMeshId: number = this.stMeshService.createBaseMesh();
    const baseMesh: StMesh = this.stMeshService.getStMeshById(baseMeshId);
    const threeMesh: THREE.Mesh = this.threeMeshService.getMeshById(baseMeshId);
    stScene.stMeshIds.push(baseMeshId);

    this.sceneService.createScene(sceneId);
    if (threeMesh) {
      const mesh: THREE.Mesh = threeMesh;

      this.sceneService.addMeshToScene(sceneId, mesh);
    }

    this.stSceneDict[sceneId] = stScene;
    this.recyclableSequenceService.associateStObjectToId(sceneId, stScene);

    return sceneId;
  }

  getSceneById(id: number): StScene
  {
    const scene: StScene = this.stSceneDict[id];

    return scene;
  }
}
