import { TestBed } from '@angular/core/testing';

import { AppUpdateLayoutService } from './app-update-layout.service';

describe('AppUpdateLayoutService', () => {
  let service: AppUpdateLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppUpdateLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check for route information', () => {
    const hasInformation = service.checkForRouteInformation(['','','']);
    expect(hasInformation).toBeTruthy();
  });

  it('should return the stRendererId from routeInformation', () => {
    const info = ['','','1'];
    const stRendererId = service.getRenderIdStringFromRouteInformation(info);
    expect(stRendererId).toEqual(info[2]);
  });

  it('should return the numeric edit id', () => {
    const stringId = "1";
    const mode = "update";
    const numberId = service.getEditNumericRendererId(stringId, mode);

    expect(numberId).toEqual(1);
  });

  it('should get the mode from route information', () => {
    const routeInformation = ['', 'update', ''];
    const mode = service.getModeFromRouteInformation(routeInformation);

    expect(mode).toEqual(routeInformation[1]);
  })
});
