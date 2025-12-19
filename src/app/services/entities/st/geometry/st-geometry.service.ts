import { inject, Injectable } from '@angular/core';
import { RecyclableSequenceService } from '../../../utilities/general/recyclable-sequence-service.service';
import { GeometryService } from '../../three/geometry/geometry.service';
import { StGeometry } from '../../../../interfaces/st';

import { StTriple } from '../../../../interfaces/base/triple/st-triple';

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
      const stGeometryId = this.recyclableSequenceService.generateStId();

      const stGeometry: StGeometry= {
        type: 'st-geometry',
        stGeometryId: stGeometryId,
        stWidth: 1,
        stHeight: 1,
        stDepth: 1,
        stType: 'box'
      };
  
      // create a geometry
      this.geometryService.createGeometry(stGeometryId);

      // create the dimensions
      const dimensions: StTriple = { 
        stX: stGeometry.stWidth,
        stY: stGeometry.stHeight,
        stZ: stGeometry.stDepth
       };
      
       // set the dimensions on the geometry
       this.geometryService.setDimensions(stGeometryId, dimensions);
       this.stGeometryDict[stGeometryId] = stGeometry;
       this.recyclableSequenceService.associateStObjectToId(stGeometryId, stGeometry);
  
      return stGeometryId;
    }

  getGeometryById(stGeometryId: number): StGeometry
  {
    const stGeometry: StGeometry = this.stGeometryDict[stGeometryId];

    return stGeometry;
  }
}
