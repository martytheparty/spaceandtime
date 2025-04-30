import { TestBed } from '@angular/core/testing';

import { PlatformService } from './platform.service';

describe('PlatformService', () => {
  let service: PlatformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set events', () => {
    expect(service.eventsInitialized).toBeFalse();
    service.setEvents();
    service.calculateVisualizationPositions();
    expect(service.eventsInitialized).toBeTrue();
  })

});
