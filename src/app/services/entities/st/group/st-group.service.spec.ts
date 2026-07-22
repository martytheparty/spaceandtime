import { TestBed } from '@angular/core/testing';

import { StGroupService } from './st-group.service';

describe('StGroupService', () => {
  let service: StGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
