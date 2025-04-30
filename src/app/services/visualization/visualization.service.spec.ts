import { Component } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationService } from './visualization.service';
import { StVisualization } from '../../interfaces/st';
import { RendererService } from '../three/renderer/renderer.service';
import { RecyclableSequenceService } from '../utilities/recyclable-sequence-service.service';

import { VizComponent } from '../../components/viz/viz.component';


@Component({
  imports: [VizComponent],
  template: `<app-viz [stRendererInputId]="1"></app-viz>`, // ✅ Provide input here
})
class TestHostComponent {}

describe('VisualizationService', () => {
  let service: VisualizationService;
  let rendererService: RendererService;
  let recyclableSequenceService: RecyclableSequenceService;

  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    service = TestBed.inject(VisualizationService);
    rendererService = TestBed.inject(RendererService);
    recyclableSequenceService = TestBed.inject(RecyclableSequenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get visualization ids', () => {
    const ids: number[] = service.getVisualizationIds();
    expect(ids.length).toEqual(0);
  });

  // unit test setCalculatedPosition
  it('should change the stTop for a new row', () => {
    const isTooWide = (left: number, width: number, viewPortWidth: number) => {
      return true;
    };

    const mockElement = {
      style: { left: 0, top: 0 },
    } as unknown as HTMLDivElement;

    const mockViz: StVisualization = {
      stLeft: 100,
      stTop: 0,
      vizComponent: {
        rendererViewChild: {
          nativeElement: {
            parentElement: mockElement
          }
        }
      }
    } as unknown as StVisualization;

    const visualizations: StVisualization[] = [ mockViz ];

    const viewPortWidth = 100; // this doesn't because isTooWide always returns true
    expect(mockViz.stTop).toEqual(0);
    service.setCalculatedPositions(isTooWide, viewPortWidth, visualizations);
    expect(mockViz.stTop).toEqual(200);

  });

  it('should create a new visualization', () => {
      const rendererId = recyclableSequenceService.generateId();
      rendererService.createRenderer(rendererId);

      const mockElement = {
        style: { left: 0, top: 0 },
      } as unknown as HTMLDivElement;

      const mockViz: StVisualization = {
        stLeft: 100,
        stTop: 0,
        vizComponent: {
          rendererViewChild: {
            nativeElement: {
              parentElement: mockElement
            }
          }
        }
      } as unknown as StVisualization;
      const vizComponent: VizComponent = fixture.debugElement.children[0].componentInstance;
      service.viewPortWidth = service.viewPortWidth + 1;
      const visualizationId = service.createVisualization(rendererId, vizComponent);

      expect(visualizationId).not.toEqual(rendererId);
      expect(service.getVisualizationIds().length).toBeGreaterThan(0);

  });
});
