import { StVisualization } from "../../visualization/st-visualization";
import { StCamera } from "../camera/st-camera";
import { StScene } from "../scene/st-scene";
import * as THREE from 'three';

export interface StRenderer {
    stRendererId: number;
    stWidth: number;
    stHeight: number;
    stCamera: StCamera;
    stScene: StScene;
    stVisualization?: StVisualization;
    rendererId?: number;
    threeRenderer?: THREE.WebGLRenderer;  // do not require three objects due to future import export
    deleted: boolean;
}
