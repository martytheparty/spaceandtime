export interface StVisualization {
    type: 'st-visualization';
    stVisualizationId: number;
    stLeft: number;
    stTop: number;
    stWidth: number;
    stHeight: number;
    stRendererId?: number;
    manualPlacement: boolean; // true means that the user specifically placed it so it is out of the flow (no css)
    stVizComponentId: number;
}
