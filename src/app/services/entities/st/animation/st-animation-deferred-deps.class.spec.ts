import { TestBed } from '@angular/core/testing';
import { StAnimationDeferredDepsClass } from './st-animation-deferred-deps.class';

describe('StAnimationDeferredDepsClass', () => {
  let instance: StAnimationDeferredDepsClass;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    TestBed.runInInjectionContext(() => {
      instance = new StAnimationDeferredDepsClass();
    });
  });   

  it('should create an instance', () => {
    expect(instance).toBeTruthy();
  });
});
