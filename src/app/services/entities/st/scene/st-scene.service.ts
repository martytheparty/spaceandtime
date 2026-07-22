import { inject, Injectable, Injector, OnInit } from '@angular/core';
import { StMeshService } from '../mesh/st-mesh.service';

import * as THREE from 'three';
import { RecyclableSequenceService } from '../../../utilities/general/recyclable-sequence-service.service';
import { StScene } from '../../../../interfaces/st';
import { SceneService } from '../../three/native/scene/scene.service';
import { MeshService } from '../../three/native/mesh/mesh.service';
import { StRendererService } from '../renderer/st-renderer.service';
import { StSceneDeferredDepsClass } from './st-scene-deferred-deps.class';
import { StSceneDictionary } from '../../../../interfaces/base/dictionary/base-dicts';
import { StGroupService } from '../group/st-group.service';
import { GroupService } from '../../three/native/group/group.service';


@Injectable({
  providedIn: 'root'
})
export class StSceneService {

  private stSceneDict: StSceneDictionary = {};

  // Construction Time Dependencies (100% guaranteed that this service WILL exist )
  private recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);
  private sceneService: SceneService = inject(SceneService);
  private stGroupService: StGroupService = inject(StGroupService);
  private stMeshService: StMeshService = inject(StMeshService);
  // ⏰ We should not need the Mesh Service once the Group is integrated.
  private threeMeshService: MeshService = inject(MeshService); // 👀 Look into removing this Construction Time Dependency
  private threeGroupService: GroupService = inject(GroupService); // 👀 Look into removing this Construction Time Dependency

  // StScene Runtime Dependencies
  private stSceneDeferredDepsClass: StSceneDeferredDepsClass = new StSceneDeferredDepsClass();

  constructor() { }
  // 🐣 Base SCENE
  createBaseScene(): number
  {
    const sceneId = this.recyclableSequenceService.generateStId();

    const stScene: StScene = {
      type: 'st-scene',
      stSceneId: sceneId,
      stGroupIds: [],
    };

    const baseGroupId: number = this.stGroupService.createBaseGroup();
    const threeGroup: THREE.Group = this.threeGroupService.getGroupByStGroupId(baseGroupId);
    console.log("THREE GROUP", threeGroup);
    stScene.stGroupIds.push(baseGroupId);

    this.sceneService.createScene(sceneId);

    if (threeGroup) {
      // 3️⃣ writes to ThreeJS
      console.log("ADDING GROUP");
      this.sceneService.addGroupToScene(sceneId, threeGroup)
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
    currentStScene.stGroupIds.forEach(
      (stGroupId: number) => {
        this.stGroupService.deleteGroupForSceneId(stGroupId, stSceneId);
      }
    );

    // 1) Remove the Scene From The Dictionary
    delete this.stSceneDict[stSceneId];
    // 2) Delete the Three Scene
    this.sceneService.deleteSceneById(stSceneId);
    // 3) Recycle the SceneId
    this.recyclableSequenceService.recycleId(stSceneId);
    this.recyclableSequenceService.logSequenceDictionary();

    return deleted;
  }

  getScenesForGroupId(stGroupId: number): number[]
  {
    const stScenes: StScene[] = Object.values(this.stSceneDict);
    const foundScenes: StScene[] = stScenes.filter( this.checkStSceneForStGroupId.bind(this, stGroupId));
    const foundSceneIds: number[] = foundScenes.map( this.getIdForStScene );

    return foundSceneIds;
  }

  getIdForStScene(stScene: StScene): number
  {
    return stScene.stSceneId;
  }

  checkStSceneForStGroupId(stGroupId: number, stScene: StScene): boolean
  {
    let found = false;
    const emptyContext = {};
    const foundIndex = stScene.stGroupIds.findIndex( this.checkForGroupIdMatch.bind(emptyContext, stGroupId));

    if (foundIndex >= 0) {
      found = true;
    }
    // now search in this array of mesh IDs for the passed in one
    return found;
  }

  checkForGroupIdMatch(stGroupId: number, stGroupIdForStScene: number): boolean
  {
    return stGroupIdForStScene === stGroupId;
  }
}
