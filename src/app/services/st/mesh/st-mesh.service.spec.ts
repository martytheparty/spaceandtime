import { TestBed } from '@angular/core/testing';

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
});
