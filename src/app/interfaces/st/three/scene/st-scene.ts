import { StMesh } from "../mesh/st-mesh";
import * as THREE from 'three';

export interface StScene {
    stSceneId: number;
    stMeshes: StMesh[];
    threeScene?: THREE.Scene;  // do not require three objects due to future import export
}
