import * as THREE from 'three';

export interface StMaterial {
    stMaterialId: number;
    stType: 'normal';
    stSide: typeof THREE.DoubleSide | typeof THREE.FrontSide | typeof THREE.BackSide;
    threeMaterial?: THREE.MeshNormalMaterial; // do not require three objects due to future import export
}
