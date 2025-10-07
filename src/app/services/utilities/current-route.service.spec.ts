import { TestBed } from '@angular/core/testing';

import { CurrentRouteService } from './current-route.service';

import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';

import { LayoutType } from '../../interfaces/layout/layout-types';

describe('CurrentRouteService', () => {
  let service: CurrentRouteService;
    let mockRouter: any;
    let events$: Subject<unknown>;

  beforeEach(() => {

    events$ = new Subject<unknown>();
    mockRouter = {
      events: events$.asObservable(),
      url: '/custom'
    };

    TestBed.configureTestingModule({
      providers: [
        CurrentRouteService,
        { provide: Router, useValue: mockRouter }
      ]
    });
    service = TestBed.inject(CurrentRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with "custom"', () => {
    expect(service.currentRoute()).toBe('custom');
  });

  it('should update when NavigationEnd emits a new URL', () => {
    mockRouter.url = '/update/1';

    // Simulate a navigation end event
    events$.next(new NavigationEnd(1, '/update/1', '/update/1'));

    expect(service.currentRoute()).toBe('update');
  });

  it('should set empty string if route has no first segment', () => {
    mockRouter.url = '/';
    events$.next(new NavigationEnd(3, '/', '/'));
    expect(service.currentRoute()).toBe('');
  });

});
