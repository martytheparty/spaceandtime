import { inject, Injectable, Injector, OnInit } from '@angular/core';
import { StMeshService } from '../mesh/st-mesh.service';

import * as THREE from 'three';
import { RecyclableSequenceService } from '../../../utilities/general/recyclable-sequence-service.service';
import { StMesh, StScene } from '../../../../interfaces/st';
import { SceneService } from '../../three/scene/scene.service';
import { MeshService } from '../../three/mesh/mesh.service';
import { StRendererService } from '../renderer/st-renderer.service';
import { StSceneDeferredDepsClass } from './st-scene-deferred-deps.class';
import { StSceneDictionary } from '../../../../interfaces/base/dictionary/base-dicts';


@Injectable({
  providedIn: 'root'
})
export class StSceneService {

  private stSceneDict: StSceneDictionary = {};

  // Construction Time Dependencies (100% guaranteed that this service WILL exist )
  private recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);
  private sceneService: SceneService = inject(SceneService);
  private stMeshService: StMeshService = inject(StMeshService);
  private threeMeshService: MeshService = inject(MeshService); // Look into removing this Construction Time Dependency

  // StScene Runtime Dependencies
  private stSceneDeferredDepsClass: StSceneDeferredDepsClass = new StSceneDeferredDepsClass();

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
    const threeMesh: THREE.Mesh = this.threeMeshService.getMeshByStMeshId(baseMeshId);
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

  deleteSceneByIdForStRenderer(stSceneId: number, stRendererId: number): boolean {
    let deleted = true;
    // Get a runtime version of StRendererService
    const stRendererService: StRendererService = this.stSceneDeferredDepsClass.getStRendererService();

    // get a list renderers that are using this stSceneId (excluding)
    const rendererIds: number[] = stRendererService
                                  .getRenderersBySceneId(stSceneId)
                                  .filter( (rendererId: number) => rendererId !== stRendererId );


    // at this time you can not have more than one scene per renderer
    //if (rendererIds.length > 0) { // we found a renderer that is using this stSceneId
    //  deleted = false;
    //} else {
      this.deleteSceneById(stSceneId);
    //}

    return deleted;
  }

  deleteSceneById(stSceneId: number): boolean {
    let deleted = true;

    // delete associated meshes
    const currentStScene: StScene = this.stSceneDict[stSceneId];
    currentStScene.stMeshIds.forEach(
      (stMeshId: number) => {
        this.stMeshService.deleteMeshForSceneId(stMeshId, stSceneId);
      }
    );

    // 1) Remove the Scene From The Dictionary
    delete this.stSceneDict[stSceneId];
    // 2) Recycle the SceneId
    this.recyclableSequenceService.recycleId(stSceneId);
    this.recyclableSequenceService.logSequenceDictionary();

    return deleted;
  }

  getScenesForMeshId(stMeshId: number): number[]
  {
    const stScenes: StScene[] = Object.values(this.stSceneDict);
    const foundScenes: StScene[] = stScenes.filter( this.checkStSceneForStMeshId.bind(this, stMeshId));
    const foundSceneIds: number[] = foundScenes.map( this.getIdForStScene );

    return foundSceneIds;
  }

  getIdForStScene(stScene: StScene): number
  {
    return stScene.stSceneId;
  }

  checkStSceneForStMeshId(stMeshId: number, stScene: StScene): boolean
  {
    let found = false;
    const emptyContext = {};
    const foundIndex = stScene.stMeshIds.findIndex( this.checkForMeshIdMatch.bind(emptyContext, stMeshId));

    if (foundIndex >= 0) {
      found = true;
    }
    // now search in this array of mesh IDs for the passed in one
    return found;
  }

  checkForMeshIdMatch(stMeshId: number, stMeshIdForStScene: number): boolean
  {
    return stMeshIdForStScene === stMeshId;
  }
}
