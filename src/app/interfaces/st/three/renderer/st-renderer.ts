import { StCamera } from "../camera/st-camera";
import { StScene } from "../scene/st-scene";
import * as THREE from 'three';

export interface StRenderer {
    stRendererId: number
    stWidth: number
    stHeight: number
    stAnimation?: (time: number) => void 
    stCamera: StCamera
    stScene: StScene
    nativeElement?: any
    rendererId?: number
    threeRenderer?: THREE.WebGLRenderer  // do not require three objects due to future import export
}
