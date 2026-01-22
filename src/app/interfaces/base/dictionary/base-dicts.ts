import { VizComponent } from "../../../components/viz/viz.component";

import * as THREE from 'three';
import { 
  StAnimation,
  StCamera,
  StGeometry,
  StMaterial,
  StMesh,
  StRenderer,
  StScene,
  StVisualization
} from "../../st";

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

// Holds ThreeJsCameras
export interface ThreeCameraDictionary {
  [id: number]: THREE.PerspectiveCamera;
}

// Holds ThreeJsGeometries
export interface ThreeGeometryDictionary {
  [id: number]: THREE.BoxGeometry;
}

// Holds ThreeJsMaterials
export interface ThreeMaterialDictionary {
  [id: number]: THREE.MeshNormalMaterial;
}

// Holds ThreeJsMeshes
export interface ThreeMeshDictionary {
  [id: number]: THREE.Mesh;
}

// Holds StAnimations

export interface StAnimationDictionary {
  [id: number]: StAnimation;
}

// Holds Visualization Object
export interface SequenceDictionary {
  [id: number]: SeqenceStTypes;
}

export type SeqenceStTypes = null 
            | VizComponent 
            | StVisualization 
            | StCamera
            | StAnimation
            | StScene
            | StGeometry
            | StRenderer
            | StMaterial
            | StMesh
            | StVisualization;
