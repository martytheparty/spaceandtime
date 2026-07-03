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

  it('should update ST Visualization Size', () => {
    // Fake component
    const mockComponent: AppUpdateLayoutComponent  = {
      id: 1,
      viewerView: {
        nativeElement: {
          offsetWidth: 200,
          offsetHeight: 100,
        },
      },
      afterInitComplete: false,
      finalizeInitialization: (comp: any) => {
        return () => { comp.afterInitComplete = true; };
      }
    } as unknown as AppUpdateLayoutComponent;

    const stVisualizationSizeUpdated = component.updateStVisualizationSize(mockComponent, true, true);

    expect(stVisualizationSizeUpdated).toBe(true);
  });

  it('checks for editor view dom element existing', () => {
    // Fake component
    const mockComponent: AppUpdateLayoutComponent  = {
      id: 1,
      viewerView: {
        nativeElement: {
          offsetWidth: 200,
          offsetHeight: 100,
        },
      },
      afterInitComplete: false,
      finalizeInitialization: (comp: any) => {
        return () => { comp.afterInitComplete = true; };
      }
    } as unknown as AppUpdateLayoutComponent;

    const exists = component.doesEditorViewDomElementExist(mockComponent);

    expect(exists).toBeTrue();
  });

  it('check for render existing', () => {
    component.appUpdateLayoutService.editRenderId.set(1);
    const created = component.isStRendererCreated();

    expect(created).toBeTrue();
  });


});
