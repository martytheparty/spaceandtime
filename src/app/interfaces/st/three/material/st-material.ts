import * as THREE from 'three';

export interface StMaterial {
    type: 'st-material';
    stMaterialId: number;
    stType: 'normal';
    stSide: typeof THREE.DoubleSide | typeof THREE.FrontSide | typeof THREE.BackSide;
}
