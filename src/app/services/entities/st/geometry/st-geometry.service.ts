import { inject, Injectable } from '@angular/core';
import { RecyclableSequenceService } from '../../../utilities/general/recyclable-sequence-service.service';
import { GeometryService } from '../../three/native/geometry/geometry.service';
import { StGeometry } from '../../../../interfaces/st';

import { StTriple } from '../../../../interfaces/base/triple/st-triple';
import { StMeshService } from '../mesh/st-mesh.service';
import { StGeometryDeferredDepsClass } from './st-geometry-deferred-deps.class';
import { StGeometryDictionary } from '../../../../interfaces/base/dictionary/base-dicts';

@Injectable({
  providedIn: 'root'
})
export class StGeometryService {
  private stGeometryDict: StGeometryDictionary = {};

  private recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);
  private geometryService: GeometryService = inject(GeometryService);
  private stGeometryDeferredDepsClass: StGeometryDeferredDepsClass = new StGeometryDeferredDepsClass();
  
  // can't create this here... need to defer the retrieval
  // private stMeshService: StMeshService = inject(StMeshService);

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

  deleteStGeometryForStMesh(stGeometryId: number, stMeshId: number): boolean
  {
    const stMeshService: StMeshService = this.stGeometryDeferredDepsClass.getStMeshService();
    // 1) Get a list 📋 of meshes 🧊 that are using this stId 🆔
    const stMeshIds: number[] = stMeshService.getStMeshIdsForStGeometryId(stGeometryId);
    // 2) if the geometry is being used by another mesh do not delete it
    const otherMeshes: number[] = stMeshIds.filter( this.checkStGeometryIdForMatch.bind({}, stMeshId)); 
    // 3) otherwise delete and recycle
    if (otherMeshes.length === 0) {
      // removes 💥 it 📐 from local memory 📝.
      delete this.stGeometryDict[stGeometryId];

      this.geometryService.deleteGeometryByStGeometryId(stGeometryId);

      // removes 💥 from sequences 🔢
      this.recyclableSequenceService.recycleId(stGeometryId);
    }

    return true;
  }

  checkStGeometryIdForMatch(stMeshId: number, stMeshCandiateId: number): boolean
  {
    return stMeshCandiateId !== stMeshId;
  }
}
