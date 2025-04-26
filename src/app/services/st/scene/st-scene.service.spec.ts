import { TestBed } from '@angular/core/testing';

import { StSceneService } from './st-scene.service';

describe('StSceneService', () => {
  let service: StSceneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StSceneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a base scene', () => {
    const sceneId = service.createBaseScene();
    const stScene = service.getSceneById(sceneId);

    expect(stScene.stSceneId).toEqual(sceneId);
  })
});
