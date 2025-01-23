import { StCamera } from "../camera/st-camera";
import { StScene } from "../scene/st-scene";

export interface StRenderer {
    stWidth: number
    stHeight: number
    stAnimation?: (time: number) => void 
    stCamera: StCamera
    stScene: StScene
}
