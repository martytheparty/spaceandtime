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

  it('should determine the current id', () => {
    const view = "update";
    // should be based on the last part the the href so in this case "update"
    const href = "http://any.com/mysite/update/100";

    const currentId = component.getCurrentRendererId(view, href);
    expect(currentId).toEqual(100);
  });

  it('should finalize initialization for the component', () => {
    const afterInitFunction = component.finalizeInitialization(component);
    expect(component.afterInitComplete).toEqual(false);
    afterInitFunction();
    expect(component.afterInitComplete).toEqual(true);
  });

  it('should process the visualization', () => {
    const processed = component.processVisualization(component);
    // should return a false because the stRendererId is 0
    expect(component.stRendererId).toEqual(0);
    expect(processed).toEqual(false);
  });

  it('should process the visualization', () => {
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

    expect(component.viewerHeight).toEqual(0);
    
    component.processVisualization(mockComponent);
  });

  it('should check if the St Renderer Was Created', () => {
    // Fake component
    const mockComponent: AppUpdateLayoutComponent  = {
      stRendererId: 1
    } as unknown as AppUpdateLayoutComponent;

    const isRendered = component.isStRendererCreated(mockComponent);

    expect(isRendered).toBe(true);
  });

  it('should update the components viewerDimentions', () => {
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

    const nativeElement = mockComponent.viewerView?.nativeElement as HTMLDivElement;

    const isResized = component.resizeVisualization(mockComponent, nativeElement);

    expect(isResized).toBe(true);
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
  })


});
