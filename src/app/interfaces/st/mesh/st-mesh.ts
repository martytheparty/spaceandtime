import { StAnimation } from "../animation/st-animation";
import { StGeometry } from "../geometry/st-geometry";
import { StMaterial } from "../material/st-material";
import { StTriple } from "../triple/st-triple";

export interface StMesh {
    stPosition: StTriple,
    stRotation: StTriple,
    stGeometry: StGeometry
    stMaterial: StMaterial
    stAnimations: StAnimation[]
}
