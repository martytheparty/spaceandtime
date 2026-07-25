import { TestBed } from '@angular/core/testing';
import { StGroupDeferredDepsClass } from './st-group-deferred-deps.class';

describe('StGroupDeferredDepsClass', () => {
  let gddcInstance: StGroupDeferredDepsClass;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    TestBed.runInInjectionContext(() => {
      gddcInstance = new StGroupDeferredDepsClass();
    });
  });   

  it('should create an instance', () => {
    expect(gddcInstance).toBeTruthy();
  });
});
