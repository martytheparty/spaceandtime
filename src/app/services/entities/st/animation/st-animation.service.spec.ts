import { TestBed } from '@angular/core/testing';

import { StAnimationService } from './st-animation.service';
import { StAnimation, StMesh } from '../../../../interfaces/st';
import { StMeshService } from '../mesh/st-mesh.service';

describe('StAnimationService', () => {
  let service: StAnimationService;
  let stMeshService: StMeshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StAnimationService);
    stMeshService = TestBed.inject(StMeshService);
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

  it('gets animations from a stMesh', () => {
    const stMeshId: number = stMeshService.createBaseMesh();
    // 📝 if/when auto animations are no long added this will need to
    // be updated or it might actually break
    const stMesh: StMesh = stMeshService.getStMeshById(stMeshId);

    service.getAnimationsFromStMesh(stMesh);
  });

});
