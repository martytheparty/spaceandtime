import { TestBed } from '@angular/core/testing';

import { StCameraService } from './st-camera.service';

describe('StCameraService', () => {
  let service: StCameraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StCameraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
