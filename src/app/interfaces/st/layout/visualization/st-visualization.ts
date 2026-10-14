// Describes the div/container that contains the threeJS Viz
export interface StVisualization {
    type: 'st-visualization';
    stVisualizationId: number;
    stLeft: number;
    stTop: number;
    stWidth: number; // The Div Width (not the threeJS Viz Width)
    stHeight: number; // The Div Height (not the threeJS Viz Width)
    stRendererId?: number; // consider making this an array
    manualPlacement: boolean; // true means that the user specifically placed it so it is out of the flow (no css)
    stVizComponentId: number;
}
