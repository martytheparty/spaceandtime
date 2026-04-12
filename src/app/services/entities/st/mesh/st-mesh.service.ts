import { inject, Injectable } from '@angular/core';

import { RecyclableSequenceService } from '../../../utilities/general/recyclable-sequence-service.service';

import { MeshService } from '../../three/mesh/mesh.service';
import { GeometryService } from '../../three/geometry/geometry.service';

import { StMesh } from '../../../../interfaces/st';
import { StGeometryService } from '../geometry/st-geometry.service';
import { StMaterialService } from '../material/st-material.service';

import * as THREE from 'three';
import { MaterialService } from '../../three/material/material.service';
import { StSceneService } from '../scene/st-scene.service';
import { StMeshDeferredDepsClass } from './st-mesh-deferred-deps.class';


@Injectable({
  providedIn: 'root'
})
export class StMeshService {

  private stMeshDict: any = {};

  // must defer loading
  //private stSceneService: StSceneService = inject(StSceneService);
  private stMeshDeferredDepsClass: StMeshDeferredDepsClass = new StMeshDeferredDepsClass(); 

  // utilities services
  private recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);

  // three services
  private meshService: MeshService = inject(MeshService);
  private geometryService: GeometryService = inject(GeometryService);
  private materialService: MaterialService = inject(MaterialService);

  // st services
  private stMaterialService: StMaterialService = inject(StMaterialService);
  private stGeometryService: StGeometryService = inject(StGeometryService);

  constructor() { }

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

  deleteMeshForSceneId(stMeshId: number, stSceneId: number): boolean
  {
    let shouldDelete = false;
    // q1. who needs to be checked in with before a delete?
    // a1. st scene service
    const stSceneService: StSceneService = this.stMeshDeferredDepsClass.getStSceneService();
    const allSceneIds = stSceneService.getScenesForMeshId(stMeshId);

    // get a list of scenes using this meshId and if there are other than the passed in scene
    const otherScenes = allSceneIds.filter( (stSceneIdValue: number) => stSceneIdValue !== stSceneId );
     
    // then don't delete.... otherwise attempt to delete the children and delete & recycle both.
    shouldDelete = !this.hasOtherScenes(otherScenes);

    this.deleteMesh(stMeshId, shouldDelete);

    return !this.hasOtherScenes(otherScenes);
  }

  hasOtherScenes(sceneIds: number[]): boolean {
    return sceneIds.length > 0; 
  }

  deleteMesh(meshId: number, shouldDelete: boolean = true): boolean
  {
    if (shouldDelete) {
      delete this.stMeshDict[meshId];
      this.recyclableSequenceService.recycleId(meshId);
    }

    return shouldDelete;
  }

}
