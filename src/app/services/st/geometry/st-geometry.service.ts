import { inject, Injectable } from '@angular/core';
import { RecyclableSequenceService } from '../../utilities/recyclable-sequence-service.service';
import { GeometryService } from '../../three/geometry/geometry.service';
import { StGeometry } from '../../../interfaces/st';

import * as THREE from 'three';
import { StTriple } from '../../../interfaces/base/triple/st-triple';

@Injectable({
  providedIn: 'root'
})
export class StGeometryService {
  private recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);
  private stGeometryDict: any = {};

  private geometryService: GeometryService = inject(GeometryService);

  constructor() { }

    createBaseGeometry(): number
    {
      const geometryId = this.recyclableSequenceService.generateId();

      const stGeometry: StGeometry= {
        stGeometryId: geometryId,
        stWidth: 1,
        stHeight: 1,
        stDepth: 1,
        stType: 'box'
      };
  
      // create a geometry
      this.geometryService.createGeometry(geometryId);

      // create the dimensions
      const dimensions: StTriple = { 
        stX: stGeometry.stWidth,
        stY: stGeometry.stHeight,
        stZ: stGeometry.stDepth
       };
      
       // set the dimensions on the geometry
       this.geometryService.setDimensions(geometryId, dimensions);
      
       stGeometry.threeGeometry = this.geometryService.getGeometryById(geometryId) as THREE.BoxGeometry;      

       this.stGeometryDict[geometryId] = stGeometry;
  
      return geometryId;
    }

  getGeometryById(id: number): StGeometry
  {
    const stGeometry: StGeometry = this.stGeometryDict[id];

    return stGeometry;
  }
}
