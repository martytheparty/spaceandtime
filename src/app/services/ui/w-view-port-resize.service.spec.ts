import { TestBed } from '@angular/core/testing';

import { WViewPortResizeService } from './w-view-port-resize.service';

describe('WViewPortResizeService', () => {
  let service: WViewPortResizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WViewPortResizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('updates the viewport size correctly', () => {
  const executed = service['onResize']();

    expect(executed).toBeTrue();
});

});
