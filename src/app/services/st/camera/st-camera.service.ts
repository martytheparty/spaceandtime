import { inject, Injectable } from '@angular/core';
import { RecyclableSequenceService } from '../../utilities/recyclable-sequence-service.service';
import { StCamera } from '../../../interfaces/st';
import { CameraService } from '../../three/camera/camera.service';
import { StTriple } from '../../../interfaces/base/triple/st-triple';

@Injectable({
  providedIn: 'root'
})
export class StCameraService {

  private recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);
  private stCameraDict: any = {};
  private cameraService: CameraService = inject(CameraService);

  constructor() { }

  createBaseCamera(aspectRatio: number): number
  {
    const frustrum = 50;
    const near = .01;
    const far = 100;

    const cameraId = this.recyclableSequenceService.generateId();
    this.cameraService.createCamera(
      cameraId, 
      frustrum, 
      aspectRatio,
      near,
      far
    );

    const stPosition: StTriple =  {
      stX: 0,
      stY: 0,
      stZ: 7
    };

    this.cameraService.setCameraPosition(cameraId, stPosition);

    const  stCamera: StCamera = {
      stCameraId: cameraId,
      stAspectRatio: aspectRatio,
      stFrustrum: frustrum,
      stNear: near,
      stFar: far,
      stPosition,
      stLookat: {
        stX: 0,
        stY: 0,
        stZ: 0
      },
      threeCamera: this.cameraService.getCameraById(cameraId)
    };

    this.stCameraDict[cameraId] = stCamera;

    return cameraId;

  }

  getCameraById(id: number): StCamera
  {
    return this.stCameraDict[id];
  }

  getAspectRatio(width: number, height: number): number
  {
    return width/height;
  }
}
