import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { AnimatableObjects, StAnimation } from '../../interfaces/st';


@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() { }

  private updatePropertyForAnimation(mesh: THREE.Mesh, animation: StAnimation): THREE.Mesh {
    const animationAlias = animation.alias;
    const path: string[] = animationAlias.split('-');
    const type: AnimatableObjects = path[0] as AnimatableObjects;
    const updateObject: any = mesh;

    if (path.length === 3) {
      const prop1 = path[1];
      const prop2 = path[2];

      updateObject[prop1][prop2] = updateObject[prop1][prop2] + animation.values[0];
    }

    return mesh;
  }

  updateMeshForAnimation(mesh: THREE.Mesh, animation: StAnimation) {
    this.updatePropertyForAnimation(mesh, animation);
    return mesh;  
  }
}
