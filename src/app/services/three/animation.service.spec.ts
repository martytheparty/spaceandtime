import { TestBed } from '@angular/core/testing';

import * as THREE from 'three';

import { AnimationService } from './animation.service';
import { StMesh } from '../../interfaces/st';

describe('AnimationService', () => {
  let service: AnimationService;


  let stMesh: StMesh =
      {
        stPosition: {
          stX: 0,
          stY: 0,
          stZ: -3
        },
        stRotation: {
          stX: 0,
          stY: 0,
          stZ: 0
        },
        stGeometry: { 
          stWidth: .75,
          stHeight: .5,
          stDepth: 3,
          stType: 'box'
        },
        stMaterial: {
          stType: 'normal',
          stSide: THREE.DoubleSide
        },
        stAnimations: [
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
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimationService);

    stMesh = {
      stPosition: {
        stX: 0,
        stY: 0,
        stZ: -3
      },
      stRotation: {
        stX: 0,
        stY: 0,
        stZ: 0
      },
      stGeometry: { 
        stWidth: .75,
        stHeight: .5,
        stDepth: 3,
        stType: 'box'
      },
      stMaterial: {
        stType: 'normal',
        stSide: THREE.DoubleSide
      },
      stAnimations: [
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
      };

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be modify rotation x', () => {

    const geometry = new THREE.BoxGeometry( 
      stMesh.stGeometry.stWidth, 
      stMesh.stGeometry.stHeight, 
      stMesh.stGeometry.stDepth
    );
    const material = new THREE.MeshNormalMaterial({side: THREE.FrontSide})

    const mesh = new THREE.Mesh( geometry, material );

    expect(mesh.rotation.x).toEqual(0);
    service.updateMeshForAnimation(mesh, stMesh.stAnimations[0]);
    expect(mesh.rotation.x).toEqual(0.05);

    expect(service).toBeTruthy();
  });

});
