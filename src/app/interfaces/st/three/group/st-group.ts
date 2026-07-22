import { StTriple } from "../../../base/triple/st-triple";

export interface StGroup {
    type: "st-group"
    stGroupId: number;
    stPosition: StTriple;
    stRotation: StTriple;
    stAnimationIds: number[];
    stMeshIds: number[];
}
