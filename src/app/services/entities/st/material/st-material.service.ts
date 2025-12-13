import { inject, Injectable } from '@angular/core';
import { RecyclableSequenceService } from '../../../utilities/general/recyclable-sequence-service.service';
import { MaterialService } from '../../three/material/material.service';
import { StMaterial } from '../../../../interfaces/st';

import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class StMaterialService {

  private recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);
  private stMaterialDict: any = {};

  private materialService: MaterialService = inject(MaterialService);

  constructor() { }

    createBaseMaterial(): number
    {
      const stMaterialId = this.recyclableSequenceService.generateStId();
      
      const stMaterial: StMaterial= {
        stMaterialId,
        stType: 'normal',
        stSide:  THREE.FrontSide
      };

      this.materialService.createMaterial(stMaterialId);
      stMaterial.threeMaterial = this.materialService.getMaterialById(stMaterialId) as THREE.MeshNormalMaterial;
      this.stMaterialDict[stMaterialId] = stMaterial;
      this.recyclableSequenceService.associateStObjectToId(stMaterialId, stMaterial)
  
      return stMaterialId;
    }
  
    getMaterialById(id: number): StMaterial
    {
      const material: StMaterial = this.stMaterialDict[id];
  
      return material;
    }
}
