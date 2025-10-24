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