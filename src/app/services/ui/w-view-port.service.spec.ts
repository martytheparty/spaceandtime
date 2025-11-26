import { TestBed } from '@angular/core/testing';

import { WViewPortService } from './w-view-port.service';

describe('WViewPortService', () => {
  let service: WViewPortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WViewPortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
