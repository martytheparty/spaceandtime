import { TestBed } from '@angular/core/testing';

import { StCameraService } from './st-camera.service';
import { StCamera } from '../../../interfaces/st';

describe('StCameraService', () => {
  let service: StCameraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StCameraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('creates a base camera', () => {
    const cameraId = service.createBaseCamera(1);
    const camera: StCamera = service.getCameraById(cameraId);

    expect(camera).toBeTruthy();
  });
});
