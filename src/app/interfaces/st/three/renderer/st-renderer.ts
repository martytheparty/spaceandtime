import { StVisualization } from "../../visualization/st-visualization";
import { StScene } from "../scene/st-scene";
import * as THREE from 'three';

export interface StRenderer {
    stRendererId: number;
    stWidth: number;
    stHeight: number;
    stCameraId: number;
    stSceneId: number;
    rendererId?: number;
    deleted: boolean;
    calculatedValues?: CalculatedValues
}

export interface CalculatedValues {
    aspectRatio: number
}