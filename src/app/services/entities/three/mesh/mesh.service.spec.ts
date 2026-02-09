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
    const mesh: THREE.Mesh = service.getMeshByStMeshId(id);
    const materials: THREE.MeshNormalMaterial[] = [];
    const material: THREE.MeshNormalMaterial = mesh.material as THREE.MeshNormalMaterial;
    materials.push(material);
    mesh.material = materials;
    service.updateMeshMaterial(id, material);
    expect(service).toBeTruthy();
  });

  it('should dispose of a material that is not an array', () => {
    const meshId = 1;
    service.createMesh(meshId);
    const mesh: THREE.Mesh = service.getMeshByStMeshId(meshId);

    const material = new THREE.MeshNormalMaterial();
    const rId = service.updateMeshMaterial(1, material);

    expect(rId).toEqual(meshId);
  });

  it('should update a mesh geometry', () => {
    const meshId = 1;
    service.createMesh(meshId);

    const mesh = service.getMeshByStMeshId(meshId);
    const boxGeometry: THREE.BoxGeometry = new THREE.BoxGeometry();

    service.updateMeshGeometry(meshId, boxGeometry);

    expect(mesh.geometry).toEqual(boxGeometry);
  });
});
