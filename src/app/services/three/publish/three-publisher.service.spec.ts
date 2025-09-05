import { TestBed } from '@angular/core/testing';

import { ThreePublisherService } from './three-publisher.service';

describe('ThreePublisherService', () => {
  let service: ThreePublisherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreePublisherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
