import { StTriple } from "../../../base/triple/st-triple";
import { StAnimation } from "../../animation/st-animation";

import * as THREE from 'three';

export interface StMesh {
    type: "st-mesh"
    stMeshId: number;
    stPosition: StTriple;
    stRotation: StTriple;
    stGeometryId: number;
    stMaterialId: number;
    stAnimationIds: number[];
}
