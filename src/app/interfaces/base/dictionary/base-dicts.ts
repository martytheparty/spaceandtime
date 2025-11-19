import { VizComponent } from "../../../components/viz/viz.component";

// Holds numbers
export interface NumberDictionary {
  [id: number]: number;
}

// Holds strings
export interface StringDictionary {
  [id: number]: string;
}

// Holds booleans
export interface BooleanDictionary {
  [id: number]: boolean;
}

// Holds VizComponents
export interface VizComponentDictionary {
  [id: number]: VizComponent;
}