import { TestBed } from '@angular/core/testing';

import * as THREE from 'three';

import { AnimationService } from './animation.service';
import { StAnimation, StGeometry, StMesh, StRenderer } from '../../interfaces/st';
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
          alias: "mesh-rotation-x",
          temporal: 'infinite',
          redraw: 'continous',
          time: 0,
          values: [.05]
        },
        { 
          alias: "mesh-rotation-y",
          temporal: 'infinite',
          redraw: 'continous',
          time: 0,
          values: [.05]
        },
        { 
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
          alias: "mesh-rotation-x",
          temporal: 'infinite',
          redraw: 'continous',
          time: 0,
          values: [.05]
        };
        stMesh.stAnimations.push(animation1);
        const animation2: StAnimation =           { 
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

});
