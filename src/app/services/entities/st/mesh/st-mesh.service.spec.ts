import { TestBed } from '@angular/core/testing';

import { StMesh } from '../../../../interfaces/st';

import { StMeshService } from './st-mesh.service';


describe('StMeshService', () => {
  let service: StMeshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StMeshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a base mesh', () => {
    const meshId = service.createBaseMesh();
    const stMesh: StMesh = service.getStMeshById(meshId);

    expect(stMesh.stMeshId).toEqual(meshId);
  })

  it('should return a list of animation ids for a mesh', () => {
    const meshId = service.createBaseMesh();
    const stMesh: StMesh = service.getStMeshById(meshId);    
    const animationIds = service.getStAnimationIdsForStMeshId(meshId);

    expect(stMesh.stAnimationIds).toEqual(animationIds);
  })
});
