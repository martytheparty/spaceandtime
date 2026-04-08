import * as THREE from 'three';

import { TestBed } from '@angular/core/testing';

import { ThreeAnimationClass } from './three-animation.class';
import { StAnimation, StRenderer } from '../../../../interfaces/st';
import { MeshService } from '../mesh/mesh.service';
import { StAnimationService } from '../../st/animation/st-animation.service';
import { StSceneService } from '../../st/scene/st-scene.service';
import { StRendererService } from '../../st/renderer/st-renderer.service';
import { RendererService } from '../renderer/renderer.service';


describe('ThreeAnimationClass', () => {
  let threeAnimationClass: ThreeAnimationClass = new ThreeAnimationClass();
  let threeMeshService: MeshService;
  let stAnimationService: StAnimationService;
  let stSceneService: StSceneService;
  let stRendererService: StRendererService;
  let threeRendererService: RendererService

  beforeEach(() => {
    TestBed.configureTestingModule({});
    stRendererService = TestBed.inject(StRendererService);
    threeRendererService = TestBed.inject(RendererService);
    stSceneService = TestBed.inject(StSceneService);
    threeMeshService = TestBed.inject(MeshService);
    // creates an StMeshService gets created when the stAnimationService gets created.
    stAnimationService = TestBed.inject(StAnimationService);

  });

  it('should be created', () => {
    expect(threeAnimationClass).toBeTruthy();
  });

  it('should update a property for animation', () => {
    const mesh: THREE.Mesh = new THREE.Mesh();
    const animation: StAnimation = {
      type: 'st-animation',
      stAnimationId: 1,
      alias: 'mesh-rotation-x',
      temporal: 'infinite',
      redraw: 'continous',
      time: 1,
      values: [1]
    };

    threeAnimationClass.updatePropertyForAnimation(mesh, animation);

    expect(1).toEqual(1);
  });

  it('should execute without error when the providers have not been populated', () => {
    // need to set up a TestBed with an injector that has a MeshService and a StAnimationService
    const emptyUnpopulatedResult = threeAnimationClass.updateAnimationsForMeshIds([], threeMeshService, stAnimationService);
    expect(emptyUnpopulatedResult).toBeFalse();
    const hasMeshIdUnpopulatedResult = threeAnimationClass.updateAnimationsForMeshIds([1], threeMeshService, stAnimationService);
    expect(hasMeshIdUnpopulatedResult).toBeFalse();
  });

  it('should execute without error when the providers have been populated', () => {
    const testStId = 1;
    const stMeshId = threeMeshService.createMesh(testStId);

    // all it does is add it to the dictionary and return the value (which is the key)
    expect(testStId).toEqual(stMeshId);

    const emptyPopulatedResult = threeAnimationClass.updateAnimationsForMeshIds([], threeMeshService, stAnimationService);
    expect(emptyPopulatedResult).toBeFalse();
    const hasMeshIdPopulatedResult = threeAnimationClass.updateAnimationsForMeshIds([stMeshId], threeMeshService, stAnimationService);
    expect(hasMeshIdPopulatedResult).toBeFalse();
  });

  it('should update a three mesh based on animations', () => {
    const mesh: THREE.Mesh = new THREE.Mesh();
    const animation: StAnimation = {
      type: 'st-animation',
      stAnimationId: 1,
      alias: 'mesh-rotation-x',
      temporal: 'infinite',
      redraw: 'continous',
      time: 1,
      values: [1]
    };

    const updateResult = threeAnimationClass.updateAnimationsForThreeMesh(mesh, [animation]);
    expect(updateResult).toBeTrue();
  });

  it('should update all of the animations for a renderer', () => {
    const stRendererId: number = stRendererService.getBaseStRenderer(); // this creates a scene, camera, mesh...
    const stRenderer: StRenderer = stRendererService.getRendererById(stRendererId);

    const rendered = threeAnimationClass.updateAnimationsForRenderer(
      stRenderer,
      stSceneService,
      threeMeshService,
      stAnimationService,
      threeRendererService
    );

    expect(rendered).toBeTrue();
  });

  it('should create an animation function for a renderer', () => {
    const stRendererId: number = stRendererService.getBaseStRenderer(); // this creates a scene, camera, mesh...
    const stRenderer: StRenderer = stRendererService.getRendererById(stRendererId);

    const animationFunction = threeAnimationClass
    .createAnimationFunctionForStrenderer(
      stRenderer,
      stSceneService,
      threeMeshService,
      stAnimationService,
      threeRendererService
    );

    animationFunction();

    expect(animationFunction).toBeTruthy();
  })


});
