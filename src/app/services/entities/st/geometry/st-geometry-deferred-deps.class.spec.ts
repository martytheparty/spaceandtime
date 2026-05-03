import { TestBed } from '@angular/core/testing';
import { StGeometryDeferredDepsClass } from './st-geometry-deferred-deps.class';

describe('StGeometryDeferredDepsClass', () => {

  let stGddcInstance: StGeometryDeferredDepsClass;

  beforeEach( () => {
    TestBed.configureTestingModule({});

    TestBed.runInInjectionContext(() => {
      stGddcInstance = new StGeometryDeferredDepsClass();
    });

  } );

  it('should create an instance', () => {
    expect(stGddcInstance).toBeTruthy();
  });
});
