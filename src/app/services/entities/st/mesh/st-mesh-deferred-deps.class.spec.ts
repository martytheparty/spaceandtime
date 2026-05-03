import { TestBed } from '@angular/core/testing';
import { StMeshDeferredDepsClass } from './st-mesh-deferred-deps.class';

describe('StMeshDeferredDepsClass', () => {
  let mddcInstance: StMeshDeferredDepsClass;
  
  beforeEach(() => {
    TestBed.configureTestingModule({});

    TestBed.runInInjectionContext(() => {
      mddcInstance = new StMeshDeferredDepsClass();
    });
  });   

  it('should create an instance', () => {
    expect(mddcInstance).toBeTruthy();
  });
});
