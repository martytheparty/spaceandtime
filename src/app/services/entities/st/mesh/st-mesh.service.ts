import { inject, Injectable } from '@angular/core';

import { RecyclableSequenceService } from '../../../utilities/general/recyclable-sequence-service.service';

import { MeshService } from '../../three/native/mesh/mesh.service';
import { GeometryService } from '../../three/native/geometry/geometry.service';

import { StMesh } from '../../../../interfaces/st';
import { StGeometryService } from '../geometry/st-geometry.service';
import { StMaterialService } from '../material/st-material.service';

import * as THREE from 'three';
import { MaterialService } from '../../three/native/material/material.service';
import { StMeshDeferredDepsClass } from './st-mesh-deferred-deps.class';
import { StMeshDictionary } from '../../../../interfaces/base/dictionary/base-dicts';
import { StAnimationService } from '../animation/st-animation.service';
import { StGroupService } from '../group/st-group.service';


@Injectable({
  providedIn: 'root'
})
export class StMeshService {

  private stMeshDict: StMeshDictionary = {};

  // must defer loading
  //private stSceneService: StSceneService = inject(StSceneService);
  private stMeshDeferredDepsClass: StMeshDeferredDepsClass = new StMeshDeferredDepsClass(); 

  // utilities services
  private recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);

  // three services
  private meshService: MeshService = inject(MeshService);
  private geometryService: GeometryService = inject(GeometryService);
  private materialService: MaterialService = inject(MaterialService);

  private stAnimationService: StAnimationService = inject(StAnimationService);

  // st services
  private stMaterialService: StMaterialService = inject(StMaterialService);
  private stGeometryService: StGeometryService = inject(StGeometryService);

  constructor() { }

  //🐣 Base MESH
  createBaseMesh(): number
  {
    const stMeshId = this.recyclableSequenceService.generateStId();

    const stMesh: StMesh = {
      type: 'st-mesh',
      stMeshId,
      stPosition: {stX: 0, stY: 0, stZ: 0},
      stRotation: {stX: 0, stY: 0, stZ: 0},
      stGeometryId: this.stGeometryService.createBaseGeometry(),
      stMaterialId: this.stMaterialService.createBaseMaterial(),
      stAnimationIds: []
    };


    this.meshService.createMesh(stMeshId);

    const geometry: THREE.BoxGeometry = this.geometryService.getGeometryByStGeometryId(stMesh.stGeometryId);
    this.meshService.updateMeshGeometry(stMeshId, geometry);

    const material: THREE.MeshNormalMaterial = this.materialService.getMaterialById(stMesh.stMaterialId);
    this.meshService.updateMeshMaterial(stMeshId, material);

    this.stMeshDict[stMeshId] = stMesh;
    this.recyclableSequenceService.associateStObjectToId(stMeshId, stMesh)

    return stMeshId;
  }

  getStMeshById(id: number): StMesh
  {
    const mesh: StMesh = this.stMeshDict[id];

    return mesh;
  }

  getStAnimationIdsForStMeshId(stMeshId: number): number[]
  {
    const stMesh: StMesh = this.getStMeshById(stMeshId);
    return stMesh.stAnimationIds;
  }

  deleteMeshForGroupId(stMeshId: number, stGroupId: number): boolean
  {
    let shouldDelete = false;
    // q1. who needs to be checked in with before a delete?
    // a1. st group service

    const stGroupService: StGroupService = this.stMeshDeferredDepsClass.getStGroupService();
    const allGroupIds = stGroupService.getGroupsForMeshId(stMeshId);
    // get a list 📋 of scenes using this meshId and if there are other than the passed in scene
    const otherGroups = allGroupIds.filter( (stGroupIdValue: number) => stGroupIdValue !== stGroupId );
     
    // then don't delete.... otherwise ❔ attempt to delete 💥 the children and delete & recycle both.
    shouldDelete = !this.hasOtherGroups(otherGroups);

    this.deleteMesh(stMeshId);
    return shouldDelete;
  }

  hasOtherScenes(sceneIds: number[]): boolean {
    return sceneIds.length > 0; 
  }

  hasOtherGroups(groupIds: number[]): boolean {
    return groupIds.length > 0; 
  }

  deleteMesh(
    stMeshId: number
  ): boolean
  {
    const stMesh: StMesh = this.stMeshDict[stMeshId];
    let deleted = true;
    // if (shouldDelete && stMesh) {
      const stGeometryId: number = stMesh.stGeometryId;
      const stMaterialId: number = stMesh.stMaterialId;

      // 💥 delete 🧊 geometry
      this.stGeometryService.deleteStGeometryForStMesh(stGeometryId, stMeshId);
      // 💥 delete 🧱 material
      this.stMaterialService.deleteStMaterialForStMesh(stMaterialId, stMeshId);
      // 💥 delete 🎞️ animations
      stMesh.stAnimationIds.forEach( 
        this.stAnimationService.deleteStAnimationForMeshId.bind(
          this.stAnimationService, // sets the context the the animation service
          stMeshId
        )
      );
        
      // 💥 delete 🕸️ mesh
      delete this.stMeshDict[stMeshId];
      // 💥 delete 3️⃣ three 🕸️ mesh
      this.meshService.deleteMeshByStMeshId(stMeshId); 
      // 💥 delete 🔢 ID
      this.recyclableSequenceService.recycleId(stMeshId);
    //}

    return deleted;
  }

  getStMeshIdsForStGeometryId(stGeometryId: number): number[]
  {
    const allStMeshes: StMesh[] = Object.values(this.stMeshDict);
    const foundStMeshes: StMesh[] = 
    allStMeshes.filter(this.getMatchingStMeshesForId.bind({}, stGeometryId));

    return foundStMeshes.map( this.getIdForMesh);
  }

  getMatchingStMeshesForId(stGeometryId: number, stMesh: StMesh): boolean {
      return stMesh.stGeometryId === stGeometryId;
  }

  getIdForMesh(stMesh: StMesh): number {
    return stMesh.stMeshId;
  }

}
