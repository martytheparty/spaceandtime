import { inject, Injectable } from '@angular/core';
import { RecyclableSequenceService } from '../../../utilities/general/recyclable-sequence-service.service';
import { StCamera } from '../../../../interfaces/st';
import { CameraService } from '../../three/camera/camera.service';
import { StTriple } from '../../../../interfaces/base/triple/st-triple';

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

    const stCameraId = this.recyclableSequenceService.generateStId();
    // creates a threeJS camera and saves it with the stCameraId
    this.cameraService.createThreeJsCamera(
      stCameraId, 
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

    this.cameraService.setCameraPosition(stCameraId, stPosition);

    const  stCamera: StCamera = {
      stCameraId: stCameraId,
      stAspectRatio: aspectRatio,
      stFrustrum: frustrum,
      stNear: near,
      stFar: far,
      stPosition,
      stLookat: {
        stX: 0,
        stY: 0,
        stZ: 0
      }
    };

    this.stCameraDict[stCameraId] = stCamera;

    this.recyclableSequenceService.associateStObjectToId(stCameraId, stCamera)

    return stCameraId;
  }

  deleteCameraById(stCameraId: number): boolean
  {
    // 1) Delete The 3JS Camera Reference 
    this.cameraService.deleteCameraByStCameraId(stCameraId);
    // 2) Delete This StCamera Reference
    delete this.stCameraDict[stCameraId];
    // 3) Recycle The ID
    this.recyclableSequenceService.recycleId(stCameraId);
    return true;
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
