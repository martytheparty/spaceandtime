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
});
