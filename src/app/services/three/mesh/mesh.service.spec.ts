import { TestBed } from '@angular/core/testing';

import { MeshService } from './mesh.service';

import * as THREE from 'three';

describe('MeshService', () => {
  let service: MeshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be a to process array of materials', () => {
    const id = 1;
    service.createMesh(id);
    const mesh: THREE.Mesh = service.getMeshById(id);
    const materials: THREE.MeshNormalMaterial[] = [];
    const material: THREE.MeshNormalMaterial = mesh.material as THREE.MeshNormalMaterial;
    materials.push(material);
    mesh.material = materials;
    service.updateMeshMaterial(id, material);
    expect(service).toBeTruthy();
  });
});
