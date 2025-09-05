import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { StTriple } from '../../../interfaces/base/triple/st-triple';

@Injectable({
  providedIn: 'root'
})
export class GeometryService {
  
  private geometryDict: any = {};

  constructor() { }

    createGeometry(
      id: number 
    ): number
    {
      this.geometryDict[id] = new THREE.BoxGeometry();
      return id;
    }

    setDimensions(id: number, dimensions: StTriple): number
    {
      // to update the size we need to create a new geometry
      const geometry: THREE.BoxGeometry =  new THREE.BoxGeometry(
        dimensions.stX, 
        dimensions.stY,
        dimensions.stZ
      );
      this.geometryDict[id] = geometry;
      return id;
    }
  
    getGeometryById(id: number): THREE.BoxGeometry
    {
      const geometry: THREE.BoxGeometry = this.geometryDict[id];
      return geometry;
    }
}
