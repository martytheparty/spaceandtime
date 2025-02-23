import { TestBed } from '@angular/core/testing';

import * as THREE from 'three';

import { AnimationService } from './animation.service';
import { StAnimation, StGeometry, StMesh } from '../../interfaces/st';
import { StMeshService } from '../st/mesh/st-mesh.service';
import { StGeometryService } from '../st/geometry/st-geometry.service';


describe('AnimationService', () => {
  let service: AnimationService;
  let stMeshService: StMeshService;
  let stGeometryService: StGeometryService;

  let stMesh: StMesh;
  let stGeometry: StGeometry;
      
  // {
  //       stPosition: {
  //         stX: 0,
  //         stY: 0,
  //         stZ: -3
  //       },
  //       stRotation: {
  //         stX: 0,
  //         stY: 0,
  //         stZ: 0
  //       },
  //       stGeometry: { 
  //         stWidth: .75,
  //         stHeight: .5,
  //         stDepth: 3,
  //         stType: 'box'
  //       },
  //       stMaterial: {
  //         stType: 'normal',
  //         stSide: THREE.DoubleSide
  //       },
  //       stAnimations: [
  //         { 
  //           alias: "mesh-rotation-x",
  //           temporal: 'infinite',
  //           redraw: 'continous',
  //           time: 0,
  //           values: [.05]
  //         },
  //         { 
  //           alias: "mesh-rotation-y",
  //           temporal: 'infinite',
  //           redraw: 'continous',
  //           time: 0,
  //           values: [.05]
  //         },
  //         { 
  //           alias: "mesh-rotation-z",
  //           temporal: 'infinite',
  //           redraw: 'continous',
  //           time: 0,
  //           values: [.05]
  //         }
  //       ]
  // };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimationService);
    stMeshService = TestBed.inject(StMeshService);
    stGeometryService = TestBed.inject(StGeometryService);

    const meshId = stMeshService.createBaseMesh();
    stMesh = stMeshService.getMeshById(meshId);

    const geometryId = stGeometryService.createBaseGeometry();
    stGeometry = stGeometryService.getGeometryById(geometryId);

  //   stMesh = 
  //   {
  //     stPosition: {
  //       stX: 0,
  //       stY: 0,
  //       stZ: -3
  //     },
  //     stRotation: {
  //       stX: 0,
  //       stY: 0,
  //       stZ: 0
  //     },
  //     stGeometry: { 
  //       stWidth: .75,
  //       stHeight: .5,
  //       stDepth: 3,
  //       stType: 'box'
  //     },
  //     stMaterial: {
  //       stType: 'normal',
  //       stSide: THREE.DoubleSide
  //     },
  //     stAnimations: [
  //       { 
  //         alias: "mesh-rotation-x",
  //         temporal: 'infinite',
  //         redraw: 'continous',
  //         time: 0,
  //         values: [.05]
  //       },
  //       { 
  //         alias: "mesh-rotation-y",
  //         temporal: 'infinite',
  //         redraw: 'continous',
  //         time: 0,
  //         values: [.05]
  //       },
  //       { 
  //         alias: "mesh-rotation-z",
  //         temporal: 'infinite',
  //         redraw: 'continous',
  //         time: 0,
  //         values: [.05]
  //       }
  //     ]
  //     };

  }
);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be modify rotation x', () => {

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

});
