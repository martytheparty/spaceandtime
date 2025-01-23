import * as THREE from 'three';

export interface StMaterial {
    stType: 'normal'
    stSide: typeof THREE.DoubleSide | typeof THREE.FrontSide | typeof THREE.BackSide
}
