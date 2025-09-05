import { TestBed } from '@angular/core/testing';

import { GeometryService } from './geometry.service';

import * as THREE from 'three';
import { StTriple } from '../../../interfaces/base/triple/st-triple';

describe('GeometryService', () => {
  let service: GeometryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeometryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a geometry', () => {
    const geometryId = 1;
    service.createGeometry(geometryId);
    const geometry: THREE.BoxGeometry = service.getGeometryById(geometryId);
    
    expect(geometry).toEqual(service.getGeometryById(geometryId));
  });

  it('should set dimensions', () => {
    const geometryId = 1;
    service.createGeometry(geometryId);
    const geometry: THREE.BoxGeometry = service.getGeometryById(geometryId);
    const dimensions: StTriple = {stX: 1, stY: 1, stZ: 1};

    service.setDimensions(geometryId, dimensions);

    expect(geometry.parameters.width).toEqual(dimensions.stX);
  });
});
