import { inject, Injectable } from '@angular/core';
import { RecyclableSequenceService } from '../../utilities/recyclable-sequence-service.service';
import { SceneService } from '../../three/scene/scene.service';
import { StMesh, StScene } from '../../../interfaces/st';
import { StMeshService } from '../mesh/st-mesh.service';

import * as THREE from 'three';


@Injectable({
  providedIn: 'root'
})
export class StSceneService {

  private recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);
  private stSceneDict: any = {};

  private sceneService: SceneService = inject(SceneService);
  private stMeshService: StMeshService = inject(StMeshService);

  constructor() { }

  createBaseScene(): number
  {
    const sceneId = this.recyclableSequenceService.generateId();

    const stScene: StScene = {
      stSceneId: sceneId,
      stMeshIds: []
    };

    const baseMeshId: number = this.stMeshService.createBaseMesh();
    const baseMesh: StMesh = this.stMeshService.getMeshById(baseMeshId);
    stScene.stMeshIds.push(baseMeshId);

    this.sceneService.createScene(sceneId);
    if (baseMesh.threeMesh) {
      const mesh: THREE.Mesh = baseMesh.threeMesh;

      this.sceneService.addMeshToScene(sceneId, mesh);
    }

    this.stSceneDict[sceneId] = stScene;

    return sceneId;
  }

  getSceneById(id: number): StScene
  {
    const scene: StScene = this.stSceneDict[id];

    return scene;
  }
}
