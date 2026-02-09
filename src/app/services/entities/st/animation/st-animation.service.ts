import { Injectable, inject } from '@angular/core';
import { StAnimationDictionary } from '../../../../interfaces/base/dictionary/base-dicts';
import { 
  StAnimation,
  TemporalTypes,
  ThreePathAliasType,
  RedrawTypes,
  StMesh
} from '../../../../interfaces/st';
import { RecyclableSequenceService } from '../../../utilities/general/recyclable-sequence-service.service';
import { StMeshService } from '../mesh/st-mesh.service';

@Injectable({
  providedIn: 'root',
})
export class StAnimationService {

  private stAnimationDict: StAnimationDictionary = {};
  private recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);
  private stMeshService: StMeshService = inject(StMeshService);
  
  getAnimationFromDictionary(stAnimationId: number): StAnimation | undefined
  {
    return this.stAnimationDict[stAnimationId];
  }

  private addToDictionary(stAnimation: StAnimation): StAnimation {
    this.stAnimationDict[stAnimation.stAnimationId] = stAnimation;
    return stAnimation;
  }

  createStAnimation(count: number): StAnimation {
      const stAnimationId = this.recyclableSequenceService.generateStId();

      const aliases: Record<number, ThreePathAliasType> = { 0: 'mesh-rotation-x', 1: 'mesh-rotation-y', 2: 'mesh-rotation-z' };
      const aliasMod = count % 3;
      const alias: ThreePathAliasType = aliases[aliasMod];
  
      const temporalTypes: Record<number, TemporalTypes> = { 0: 'limits', 1: 'infinite' };
      const temporalMod = count % 2;
      // we don't use this yet
      const temporal: TemporalTypes = 'infinite';
  
      const RedrawTypes: Record<number, RedrawTypes> = { 0: 'continous', 1: 'discrete' };
      const redrawMod = count % 2;
      // we don't use this yet
      const redraw: RedrawTypes = 'continous';
      const time = 0;
      const values = [.05];

      const stAnimation: StAnimation = {
        type: 'st-animation',
        stAnimationId, 
        alias,
        temporal,
        redraw,
        time,
        values
      };

      this.addToDictionary(stAnimation);
      this.recyclableSequenceService.associateStObjectToId(stAnimation.stAnimationId, stAnimation);

      return stAnimation;
  }
  
  getStAnimationsForStMeshId(meshId: number): StAnimation[] {
    const stMesh: StMesh = this.stMeshService.getStMeshById(meshId);
    const stAnimationIds: number[] = stMesh.stAnimationIds;

    const stAnimations: StAnimation[] = [];

    stAnimationIds.forEach(
      ( stAnimationId: number) => {
        const stAnimation: StAnimation | undefined = this.getAnimationFromDictionary(stAnimationId);
        if (stAnimation) {
          stAnimations.push( stAnimation );
        }
      } 
    );

  
    return stAnimations;
  }
}
