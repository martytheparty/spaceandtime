import * as THREE from 'three';

export interface StGeometry {
    stGeometryId: number;
    stWidth: number;
    stHeight: number;
    stDepth: number;
    stType: 'box';
    threeGeometry?: THREE.BoxGeometry;   // do not require three objects due to future import export
}
