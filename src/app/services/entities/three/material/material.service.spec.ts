import { TestBed } from '@angular/core/testing';

import { MaterialService } from './material.service';

import * as THREE from 'three';

describe('MaterialService', () => {
  let service: MaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a material', () => {
    const materialId = 1;
    service.createMaterial(1);
    
    const material: THREE.MeshNormalMaterial = service.getMaterialById(materialId);

    expect(material).toBeTruthy();
  })
});
