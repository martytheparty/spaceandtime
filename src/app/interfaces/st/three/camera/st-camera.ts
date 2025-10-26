
import { StTriple } from '../../../base/triple/st-triple';

export interface StCamera {
    stCameraId: number;
    stAspectRatio: number;
    stNear: number;
    stFar: number;
    stFrustrum: number;
    //Wider FOV (e.g., 75): Great for large, open environments but may introduce distortion.
    //Narrower FOV (e.g., 30): Ideal for close-up views or creating a "telephoto" effect. 
    stPosition: StTriple;
    stLookat: StTriple;
}
