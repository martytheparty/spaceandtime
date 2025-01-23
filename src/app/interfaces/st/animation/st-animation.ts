export interface StAnimation {
    alias: ThreePathAliasType
    temporal: 'limits' | 'infinite'
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

export type AnimatableObjects = 'mesh';