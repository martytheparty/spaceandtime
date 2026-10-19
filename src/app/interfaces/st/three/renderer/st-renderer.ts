export interface StRenderer {
    type: 'st-renderer';
    stRendererId: number;
    stCanvasWidth: number; // this is the threeJS Visualization Width
    stCanvasHeight: number; // this is the threeJS Visualization Height
    stCameraId: number;
    stSceneId: number;
    rendererId?: number;
    deleted: boolean;
    calculatedValues?: CalculatedValues;
    stVisualizationId: number;
}

export interface CalculatedValues {
    aspectRatio: number
}