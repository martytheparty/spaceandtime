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
  StVisualization,
  StVizComponent
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

// Holds StScenes
export interface StSceneDictionary {
  [id: number]: StScene;
}

export interface StGeometryDictionary {
  [id: number]: StGeometry;
}

export interface StMeshDictionary {
  [id: number]: StMesh;
}

// Holds Visualization Object
export interface SequenceDictionary {
  [id: number]: SequenceStTypes;
}

export type SequenceStTypes = null 
            | StVizComponent 
            | StVisualization 
            | StCamera
            | StAnimation
            | StScene
            | StGeometry
            | StRenderer
            | StMaterial
            | StMesh
            | StVisualization;

export const ST_TYPES = [
  'st-renderer',
  'st-camera',
  'st-scene',
  'st-mesh',
  'st-geometry',
  'st-material',
  'st-animation'
] as const;

export type StTypes = typeof ST_TYPES[number];
