import { TestBed } from '@angular/core/testing';

import { StAnimationService } from './st-animation.service';

describe('StAnimationService', () => {
  let service: StAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
