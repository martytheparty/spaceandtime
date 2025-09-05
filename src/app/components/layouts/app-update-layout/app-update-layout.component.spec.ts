import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { AppUpdateLayoutComponent } from './app-update-layout.component';

import { of } from 'rxjs';

describe('AppUpdateLayoutComponent', () => {
  let component: AppUpdateLayoutComponent;
  let fixture: ComponentFixture<AppUpdateLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppUpdateLayoutComponent],
      providers: [
         { 
        provide: ActivatedRoute, 
        useValue: {
          params: of({ id: 123 }),
          snapshot: { 
             paramMap: convertToParamMap({ id: '1' }) // mock id param
           }
        }
      }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppUpdateLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the aspect ratio', () => {
    const ar = 1;

    const setAr = component.setCalculatedAspectRation(ar);

    expect(setAr).toEqual(ar);
  });
});
