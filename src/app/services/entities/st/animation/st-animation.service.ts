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
import { StAnimationDeferredDepsClass } from './st-animation-deferred-deps.class';

// import { StMeshService } from '../mesh/st-mesh.service';

@Injectable({
  providedIn: 'root',
})
export class StAnimationService {

  // Construction 🏗️ Time ⏰ Dependency 💉
  private stAnimationDict: StAnimationDictionary = {};
  // Construction 🏗️ Time ⏰ Dependency 💉
  private recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);
  
  // Execution Time Deferred ⏰ dependencies 💉.
  private stAnimationDeferredDepsClass: StAnimationDeferredDepsClass = new StAnimationDeferredDepsClass();  
  
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
    let stAnimations: StAnimation[] = [];
    
    // Execution Time Deferred ⏰ dependencies 💉.
    const stMeshService: StMeshService | undefined = this.stAnimationDeferredDepsClass.getStMeshService();

    if (stMeshService !== undefined) {
        const stMesh: StMesh = stMeshService.getStMeshById(meshId);

       if (stMesh) {
         const stAnimationIds: number[] = stMesh.stAnimationIds;

         stAnimations = this.getStAnimationsForIds(stAnimationIds);
       }
    }
  
    return stAnimations;
  }

  getStAnimationsForIds(stAnimationIds: number[]): StAnimation[] {
    const filteredStAnimationIds: number[] 
    = stAnimationIds
      .filter( this.filterUndefinedStAnimation.bind(this) );

    const stAnimations: StAnimation[] 
    = filteredStAnimationIds.map( this.mapStAnimation.bind(this) );

    return stAnimations;
  }

  filterUndefinedStAnimation(stAnimationId: number): boolean {
        const stAnimation: StAnimation | undefined = this.getAnimationFromDictionary(stAnimationId);
        let foundStAnimation = false;

        if(stAnimation !== undefined) {
           foundStAnimation = true;
        }

        return foundStAnimation;
  }

  mapStAnimation(stAnimationId: number): StAnimation {
    const stAnimation: StAnimation = this.getAnimationFromDictionary(stAnimationId) as StAnimation;
    return stAnimation;
  }

  deleteStAnimationForMeshId(
    stMeshId: number, // 💀 mesh id must come first do to binding in the stMeshService
    stAnimationId: number
  ): boolean
  {
    // 🔮 we will need to check that this is not being used by another mesh
    return this.deleteAnimation(stAnimationId);
  }

  deleteAnimation(stAnimationId: number): boolean
  {
    // 💀 this deletes without making sure that the animation is not being any where
    delete this.stAnimationDict[stAnimationId];
    this.recyclableSequenceService.recycleId(stAnimationId);
    return true;
  }
}
