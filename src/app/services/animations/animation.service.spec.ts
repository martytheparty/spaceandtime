import { TestBed } from '@angular/core/testing';

import * as THREE from 'three';

import { AnimationService } from './animation.service';
import { RedrawTypes, StAnimation, StGeometry, StMesh, StRenderer, TemporalTypes, ThreePathAliasType } from '../../interfaces/st';
import { StMeshService } from '../st/mesh/st-mesh.service';
import { StGeometryService } from '../st/geometry/st-geometry.service';
import { StRendererService } from '../st/renderer/st-renderer.service';


describe('AnimationService', () => {
  let service: AnimationService;
  let stMeshService: StMeshService;
  let stGeometryService: StGeometryService;

  let stRendererService: StRendererService;

  let stMesh: StMesh;
  let stGeometry: StGeometry;


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimationService);
    stMeshService = TestBed.inject(StMeshService);
    stGeometryService = TestBed.inject(StGeometryService);
    stRendererService = TestBed.inject(StRendererService);

    const meshId = stMeshService.createBaseMesh();
    stMesh = stMeshService.getMeshById(meshId);

    const geometryId = stGeometryService.createBaseGeometry();
    stGeometry = stGeometryService.getGeometryById(geometryId);

  }
);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be modify rotation x (updateMeshForAnimation)', () => {

    const geometry = stGeometry.threeGeometry;
    const material = new THREE.MeshNormalMaterial({side: THREE.FrontSide})
    const mesh = stMesh.threeMesh as THREE.Mesh;

    const stAnimations: StAnimation[] = [
        { 
          stId: 1,
          alias: "mesh-rotation-x",
          temporal: 'infinite',
          redraw: 'continous',
          time: 0,
          values: [.05]
        },
        { 
          stId: 2,
          alias: "mesh-rotation-y",
          temporal: 'infinite',
          redraw: 'continous',
          time: 0,
          values: [.05]
        },
        { 
          stId: 2,
          alias: "mesh-rotation-z",
          temporal: 'infinite',
          redraw: 'continous',
          time: 0,
          values: [.05]
        }
      ]

    expect(mesh.rotation.x).toEqual(0);
    service.updateMeshForAnimation(mesh, stAnimations[0]);
    expect(mesh.rotation.x).toEqual(0.05);

  });

  it('should return a function (createAnimationFunctionForId)', () => {

    // new test
    const stRendererId: number = stRendererService.getBaseStRenderer();
    const stRenderer: StRenderer = stRendererService.getRendererById(stRendererId);

   stRenderer.stScene.stMeshes.forEach(
      (stMesh: StMesh) => {
        const animation1: StAnimation =           {
          stId: 1, 
          alias: "mesh-rotation-x",
          temporal: 'infinite',
          redraw: 'continous',
          time: 0,
          values: [.05]
        };
        stMesh.stAnimations.push(animation1);
        const animation2: StAnimation =           {
          stId: 2, 
          alias: "mesh-rotation-y",
          temporal: 'infinite',
          redraw: 'continous',
          time: 0,
          values: [.05]
        };
        stMesh.stAnimations.push(animation2);
      }
    );

    const fun = service.createAnimationFunctionForId(stRenderer);
    // execute to achieve 100% test coverage
    fun();

    expect(typeof fun).toEqual("function")

  });

  it('should be able to add an animation', () => {
   
    const stRendererId: number = stRendererService.getBaseStRenderer();
    const stRenderer: StRenderer = stRendererService.getRendererById(stRendererId);

    const stMesh: StMesh = stRenderer.stScene.stMeshes[0];
    const alias: ThreePathAliasType = "mesh-rotation-x";
    const temporal: TemporalTypes = "infinite";
    const redraw: RedrawTypes = "continous";
    const time: number = 0;
    const values: number[] = [1];

    expect(stMesh.stAnimations.length).toEqual(0);

    service.addAnimation(stMesh, alias,temporal,redraw, time, values);

    expect(stMesh.stAnimations.length).toEqual(1);

    service.addAnimation(stMesh, alias,temporal,redraw);

    expect(stMesh.stAnimations.length).toEqual(2);

  });

});
