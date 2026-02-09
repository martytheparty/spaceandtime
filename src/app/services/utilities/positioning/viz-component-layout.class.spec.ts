import { VizComponent } from '../../../components/viz/viz.component';
import { StVisualization } from '../../../interfaces/st';
import { VizComponentService } from '../../angular/viz-component.service';
import { VisualizationService } from '../../entities/visualization/visualization.service';
import { VizComponentLayoutClass } from './viz-component-layout.class';

describe('VizComponentLayoutClass', () => {
  const vizComponentClass = new VizComponentLayoutClass();
  const vizComponentService = new VizComponentService();

  let visualizationServiceSpy: jasmine.SpyObj<VisualizationService>;
  const vizComponentMock: VizComponent = {} as unknown as VizComponent;
  const stVisualization: StVisualization = { stLeft: 1, stTop: 1} as unknown as StVisualization;

  let parentDiv: HTMLDivElement;
  let childDiv: HTMLDivElement;

  visualizationServiceSpy = jasmine.createSpyObj('VisualizationService', [
    'getStVisualizations'
  ]);

  visualizationServiceSpy.getStVisualizations.and.returnValue([stVisualization]);



  // Create real DOM elements
  parentDiv = document.createElement('div');
  childDiv = document.createElement('div');
  parentDiv.appendChild(childDiv);

  // Fake the ViewChild structure
  vizComponentMock.rendererViewChild = {
    nativeElement: childDiv
  };



  it('should create an instance', () => {
    expect(vizComponentClass).toBeTruthy();
  });

  it('should updateVisualizationLayout', () => {
    const vizCount = 1;

    const vizCountResult = vizComponentClass.updateVisualizationLayout(vizCount, visualizationServiceSpy, vizComponentService);

    expect(vizCount).toEqual(vizCountResult);
  });

  it('should set position for a viz component', () => {
    const wasSet = vizComponentClass.setPostionForVizComponent(vizComponentMock, stVisualization);

    expect(wasSet).toBeTrue();
  })


});
