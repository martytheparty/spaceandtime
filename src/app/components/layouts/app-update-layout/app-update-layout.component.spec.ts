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

    const currentId = component.getCurrentVisualizationId(view, href);
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

    expect(processed).toEqual(true);
  });

  it('should process the visualization', () => {
        // Fake component
    const mockComponent: AppUpdateLayoutComponent  = {
      id: 1,
      editorView: {
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
});
