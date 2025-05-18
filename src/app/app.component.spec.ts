import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { fakeAsync, tick } from '@angular/core/testing';
import { VizComponent } from './components/viz/viz.component';

import { StRendererService } from './services/st/renderer/st-renderer.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let stRendererService: StRendererService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    stRendererService = TestBed.inject(StRendererService);
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should test ngAfterViewInit?', fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges(); // Triggers ngAfterViewInit
    tick(1000);
    expect(app).toBeTruthy();
  }));

  it('creates a viz component', () => {
     //let visualizationServiceSpy: jasmine.SpyObj<VisualizationService>;
     //visualizationServiceSpy = jasmine.createSpyObj('VisualizationService', ['createVisualization']);
     let mockVizComponent: jasmine.SpyObj<VizComponent>;

  // Create a mock vizComponent
    mockVizComponent = jasmine.createSpyObj('VizComponent', [
      'isInitialized',
      'stRendererInputId',
      'setAsInitialized'
    ]);
    
    fixture = TestBed.createComponent(AppComponent);
    const component: AppComponent = fixture.componentInstance;

    mockVizComponent.isInitialized.and.returnValue(false);
    mockVizComponent.stRendererInputId.and.returnValue(1);
    mockVizComponent.setAsInitialized.and.returnValue(true);

    const result = component.createVizForComponent(mockVizComponent);

    expect(result).toBeTrue();

  });

  it('temp tests for animations', () => {
    const stRendererId = stRendererService.getBaseStRenderer();

    fixture = TestBed.createComponent(AppComponent);
    const component: AppComponent = fixture.componentInstance;

    component.animatateVisualization(stRendererId, 0);
    component.animatateVisualization(stRendererId, 1);
    component.animatateVisualization(stRendererId, 2);
    const result: boolean = component.animatateVisualization(stRendererId, 3);

    expect(result).toBeTrue();
  });

});
