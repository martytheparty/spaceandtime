import { TestBed } from '@angular/core/testing';

import { EntityServiceService } from './entity-service.service';

describe('EntityServiceService', () => {
  let service: EntityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
