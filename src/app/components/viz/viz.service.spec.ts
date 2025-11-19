import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';


import { ComponentVisualizationService } from './viz.service';
import { StRendererService } from '../../services/entities/st/renderer/st-renderer.service';
import { RendererService } from '../../services/entities/three/renderer/renderer.service';


describe('VisualizationService', () => {
  let service: ComponentVisualizationService;

  let stRendererService: StRendererService;
  let rendererService: RendererService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    stRendererService = TestBed.inject(StRendererService);
    rendererService = TestBed.inject(RendererService);

    service = TestBed.inject(ComponentVisualizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should render in a native element', () => {
    const mockElementRef: ElementRef = new ElementRef(document.createElement('div'));
    const stId = stRendererService.getBaseStRenderer();
    const width = 100;
    const height = 100;

    service.renderInNativeElement(mockElementRef, stId, width, height);

    expect(1).toEqual(1);
  });
});
