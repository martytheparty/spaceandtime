import { TestBed } from '@angular/core/testing';

import { StAnimationService } from './st-animation.service';
import { StAnimation } from '../../../../interfaces/st';

describe('StAnimationService', () => {
  let service: StAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('it returns undefined for an empty dictionary', () => {

    const stAnimation: StAnimation | undefined = service.getAnimationFromDictionary(1); 
    expect(stAnimation).toEqual(undefined);
  });

  it('executes deleting an animation given a mesh and animation id', () => {

    const stMeshId = 1; // This mesh ID does not exist in this unit test
    const stAnimationId = 2; // This animation ID does not exist in this unit test
    const deleteResult = service.deleteStAnimationForMeshId(stMeshId, stAnimationId);
    expect(deleteResult).toEqual(true);
  });

  it('maps an StAnimation', () => {
    const stAnimationId = 1;

    service.createStAnimation(stAnimationId);

    const stAnimations: StAnimation[] = service.getStAnimationsForIds([stAnimationId]);

    expect(stAnimations.length).toEqual(1);
  });

});
