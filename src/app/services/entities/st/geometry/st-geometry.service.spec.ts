import { TestBed } from '@angular/core/testing';

import { StGeometryService } from './st-geometry.service';
import { StGeometry } from '../../../../interfaces/st';

describe('StGeometryService', () => {
  let service: StGeometryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StGeometryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a base geometry', () => {
    const geometryId = service.createBaseGeometry();
    const stGeometry: StGeometry = service.getGeometryById(geometryId);

    expect(stGeometry.stGeometryId).toEqual(geometryId);
  })
});
