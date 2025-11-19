import { TestBed } from '@angular/core/testing';

import * as THREE from 'three';

import { StTriple } from '../../../../interfaces/base/triple/st-triple';

import { CameraService } from './camera.service';


describe('CameraService', () => {
  let service: CameraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CameraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a threeJS camera', () => {
    const stId = 1;
    service.createCamera(stId, 1, 1, .1, 100);
    const threeCamera: THREE.PerspectiveCamera = service.getCameraByStCameraId(stId);

    expect(threeCamera).toEqual(service.getCameraByStCameraId(stId));

  });


  it('should create a threeJS camera', () => {
    const stId = 1;
    service.createCamera(stId, 1, 1, .1, 100);
    const threeCamera: THREE.PerspectiveCamera = service.getCameraByStCameraId(stId);

    const position: StTriple = {stX: 1, stY: 1, stZ: 1};
    service.setCameraPosition(stId, position);
    expect(threeCamera.position.x).toEqual(position.stX);

  });
});
