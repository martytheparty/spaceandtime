import { inject, Injectable } from '@angular/core';

import { RecyclableSequenceService } from '../../../utilities/general/recyclable-sequence-service.service';

import { MeshService } from '../../three/mesh/mesh.service';
import { GeometryService } from '../../three/geometry/geometry.service';

import { StMesh } from '../../../../interfaces/st';
import { StGeometryService } from '../geometry/st-geometry.service';
import { StMaterialService } from '../material/st-material.service';

import * as THREE from 'three';
import { MaterialService } from '../../three/material/material.service';


@Injectable({
  providedIn: 'root'
})
export class StMeshService {

  private stMeshDict: any = {};

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
      stMeshId,
      stPosition: {stX: 0, stY: 0, stZ: 0},
      stRotation: {stX: 0, stY: 0, stZ: 0},
      stGeometryId: this.stGeometryService.createBaseGeometry(),
      stMaterialId: this.stMaterialService.createBaseMaterial(),
      stAnimations: []
    };


    this.meshService.createMesh(stMeshId);
    stMesh.threeMesh = this.meshService.getMeshById(stMeshId);

    const geometry: THREE.BoxGeometry = this.geometryService.getGeometryByStGeometryId(stMesh.stGeometryId);
    this.meshService.updateMeshGeometry(stMeshId, geometry);

    const material: THREE.MeshNormalMaterial = this.materialService.getMaterialById(stMesh.stMaterialId);
    this.meshService.updateMeshMaterial(stMeshId, material);

    this.stMeshDict[stMeshId] = stMesh;
    this.recyclableSequenceService.associateStObjectToId(stMeshId, stMesh)

    return stMeshId;
  }

  getMeshById(id: number): StMesh
  {
    const mesh: StMesh = this.stMeshDict[id];

    return mesh;
  }

}
