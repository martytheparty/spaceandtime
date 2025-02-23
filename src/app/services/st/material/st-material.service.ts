import { inject, Injectable } from '@angular/core';
import { RecyclableSequenceService } from '../../utilities/recyclable-sequence-service.service';
import { MaterialService } from '../../three/material/material.service';
import { StMaterial } from '../../../interfaces/st';

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
      const materialId = this.recyclableSequenceService.generateId();
      
      const stMaterial: StMaterial= {
        stMaterialId: materialId,
        stType: 'normal',
        stSide:  THREE.FrontSide
      };

      this.materialService.createMaterial(materialId);
      stMaterial.threeMaterial = this.materialService.getMaterialById(materialId) as THREE.MeshNormalMaterial;
      this.stMaterialDict[materialId] = stMaterial;
  
      return materialId;
    }
  
    getMaterialById(id: number): StMaterial
    {
      const material: StMaterial = this.stMaterialDict[id];
  
      return material;
    }
}
