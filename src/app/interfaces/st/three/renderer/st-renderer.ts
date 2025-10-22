import { StVisualization } from "../../visualization/st-visualization";
import { StScene } from "../scene/st-scene";
import * as THREE from 'three';

export interface StRenderer {
    stRendererId: number;
    stWidth: number;
    stHeight: number;
    stCameraId: number;
    stScene: StScene;
    rendererId?: number;
    threeRenderer?: THREE.WebGLRenderer;  // do not require three objects due to future import export
    deleted: boolean;
    calculatedValues?: CalculatedValues
}

export interface CalculatedValues {
    aspectRatio: number
}