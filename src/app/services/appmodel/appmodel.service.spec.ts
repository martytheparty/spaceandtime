import { TestBed } from '@angular/core/testing';

import { AppmodelService } from './appmodel.service';
import { StVisualization } from '../../interfaces/st';

describe('AppmodelService', () => {
  let service: AppmodelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppmodelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the current visualizations', () => {
    const visualizations = service.getVisualizations();

    expect(visualizations.length).toEqual(0);
  });

  it('should clear the current edit visualization', () => {
    service.clearEditVisualization();
    const visualizations = service.getVisualizations();

    expect(visualizations.length).toEqual(0);
  });

  it('should set the edit visualization', () => {
    const stViz: StVisualization = { stVisualizationId: 1 } as unknown as StVisualization;

    service.setEditVisualization(stViz);
    expect(service.editVisualization?.stVisualizationId).toEqual(stViz.stVisualizationId);


  })
});
