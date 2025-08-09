import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute,  NavigationEnd } from '@angular/router';
import { of } from 'rxjs';


import { AppLayoutMenuComponent } from './app-layout-menu.component';
import { LayoutType } from '../../interfaces/layout/layout-types';

describe('AppLayoutMenuComponent', () => {
  let component: AppLayoutMenuComponent;
  let fixture: ComponentFixture<AppLayoutMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppLayoutMenuComponent],
      providers: [{
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: new Map() },
            params: of({}),
            queryParams: of({}),
            data: of({})
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppLayoutMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should call setLayout with the url if event is NavigationEnd', () => {
    const eventCustomToTabular = new NavigationEnd(1, '/custom', '/tabular');
    const eventTabularToCustom = new NavigationEnd(1, '/tabular', '/custom');
    const eventTabularToUpdate = new NavigationEnd(1, '/tabular', '/update/1');

    let result = component.handleRouterEvents(eventCustomToTabular);
    result = component.handleRouterEvents(eventTabularToCustom);
    result = component.handleRouterEvents(eventTabularToUpdate);

    expect(result).toBeTrue();
  });

});
