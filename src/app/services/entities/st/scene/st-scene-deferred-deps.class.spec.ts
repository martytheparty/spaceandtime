import { TestBed } from '@angular/core/testing';
import { StRendererService } from '../renderer/st-renderer.service';

import { StSceneDeferredDepsClass } from './st-scene-deferred-deps.class';

describe('StSceneDeferredDepsClass', () => {
  let deferredService: StRendererService;
  let stSceneDeferredDepsClass: StSceneDeferredDepsClass;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    deferredService = TestBed.inject(StRendererService);

    TestBed.runInInjectionContext( () => {
      stSceneDeferredDepsClass = new StSceneDeferredDepsClass();
    } )
  });

  it('should create an instance', () => {
    expect(stSceneDeferredDepsClass).toBeTruthy();
  });
});
