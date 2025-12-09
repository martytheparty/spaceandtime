import { StMesh } from '../three/mesh/st-mesh';

export interface StAnimation {
    stAnimationId: number,
    alias: ThreePathAliasType
    temporal: TemporalTypes
    redraw: 'discrete' | 'continous'
    time: number
    values: StAnimationValueTypes[]
    valueTimeFunction?: StValueFunction
}

export type StAnimationValueTypes = number | string 

export type StValueFunction = (time: number) => number | string

export type ThreePathAliasType = 
"mesh-rotation-x" | 
"mesh-rotation-y" |
"mesh-rotation-z"

export type RedrawTypes = 'discrete' | 'continous';

export type TemporalTypes = 'limits' | 'infinite';

export type AnimatableObjects = 'mesh';

export type SupportedStTypes = StMesh;