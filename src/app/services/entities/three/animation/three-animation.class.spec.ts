import { TestBed } from '@angular/core/testing';

import { ThreeAnimationClass } from './three-animation.class';

describe('ThreeAnimationVlass', () => {
  let testClass: ThreeAnimationClass = new ThreeAnimationClass();

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // service = TestBed.inject(ThreeAnimationClass);
  });

  it('should be created', () => {
    expect(testClass).toBeTruthy();
  });
});
