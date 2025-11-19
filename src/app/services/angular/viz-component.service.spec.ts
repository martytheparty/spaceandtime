import { TestBed } from '@angular/core/testing';

import { VizComponentService } from './viz-component.service';

describe('VizComponentService', () => {
  let service: VizComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VizComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
