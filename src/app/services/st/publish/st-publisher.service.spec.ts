import { TestBed } from '@angular/core/testing';

import { StPublisherService } from './st-publisher.service';

describe('StPublisherService', () => {
  let service: StPublisherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StPublisherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
