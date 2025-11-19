import { TestBed } from '@angular/core/testing';

import { StMaterialService } from './st-material.service';
import { StMaterial } from '../../../../interfaces/st';


describe('StMaterialService', () => {
  let service: StMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create and retrieve an stMaterial', () => {
    const stMaterialId: number = service.createBaseMaterial();
    const stMaterial: StMaterial = service.getMaterialById(stMaterialId);

    expect(stMaterialId).toEqual(stMaterial.stMaterialId);

    
  });
});
