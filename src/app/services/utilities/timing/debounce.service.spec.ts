import { TestBed } from '@angular/core/testing';

import { DebounceService } from './debounce.service';

describe('DebounceService', () => {
  let service: DebounceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebounceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call debounce with the default time', () => {
    const func = () => {};

    service.debounce('unit-test', func);
    const found = service.cancel('unit-test');

    expect(found).toBe(true);

    
  })
});
