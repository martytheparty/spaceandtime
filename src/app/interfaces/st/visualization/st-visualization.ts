import { VizComponent } from "../../../components/viz/viz.component";

export interface StVisualization {
    stVisualizationId: number;
    stLeft: number;
    stTop: number;
    stWidth: number;
    stHeight: number;
    stRendererId?: number;
    manualPlacement: boolean; // true means that the user specifically placed it so it is out of the flow (no css)
    vizComponent?: VizComponent; // high risk of memory leak... always destroy when done.
}
