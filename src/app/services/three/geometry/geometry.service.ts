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
      stGeometryId: number 
    ): number
    {
      this.geometryDict[stGeometryId] = new THREE.BoxGeometry();
      return stGeometryId;
    }

    setDimensions(stGeometryId: number, dimensions: StTriple): number
    {
      // to update the size we need to create a new geometry
      const geometry: THREE.BoxGeometry =  new THREE.BoxGeometry(
        dimensions.stX, 
        dimensions.stY,
        dimensions.stZ
      );
      this.geometryDict[stGeometryId] = geometry;
      return stGeometryId;
    }
  
    getGeometryByStGeometryId(stGeometryId: number): THREE.BoxGeometry
    {
      const geometry: THREE.BoxGeometry = this.geometryDict[stGeometryId];
      return geometry;
    }
}
