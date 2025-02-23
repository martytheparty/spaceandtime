import { StAnimation } from "../../animation/st-animation";
import { StTriple } from "../../triple/st-triple";

import * as THREE from 'three';

export interface StMesh {
    stMeshId: number;
    stPosition: StTriple;
    stRotation: StTriple;
    stGeometryId: number;
    stMaterialId: number;
    stAnimations: StAnimation[];
    threeMesh?: THREE.Mesh  // do not require three objects due to future import export
}
