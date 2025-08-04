import { TestBed } from '@angular/core/testing';

import { AppModelService } from './appmodel.service';

describe('AppmodelService', () => {
  let service: AppModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
