import { TestBed } from '@angular/core/testing';

import { StGeometryService } from './st-geometry.service';

describe('StGeometryService', () => {
  let service: StGeometryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StGeometryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
