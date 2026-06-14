import { TestBed } from '@angular/core/testing';

import { SceneService } from './scene.service';

import * as THREE from 'three';

describe('SceneService', () => {
  let service: SceneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SceneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a threeJS scene', () => {
    const sceneId = 1;
    service.createScene(sceneId);

    const scene: THREE.Scene = service.getSceneById(sceneId);

    expect(scene).toBeTruthy();
  });

  it('should add a threeJS mesh to a threeJS scene', () => {
    const sceneId = 1;
    service.createScene(sceneId);

    const mesh: THREE.Mesh = new THREE.Mesh();

    const addedId = service.addMeshToScene(sceneId, mesh);

    expect(addedId).toEqual(sceneId);
  });
});
