import { TestBed } from '@angular/core/testing';

import { StRendererService } from './st-renderer.service';
import { StRenderer } from '../../../interfaces/st';

describe('StRendererService', () => {
  let service: StRendererService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StRendererService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a renderer by id', () => {
    const stId: number = service.getBaseStRenderer();
    const stRenderer: StRenderer = service.getRendererById(stId);

    expect(stId).toEqual(stRenderer.stRendererId);
  });


  it('should renderer by id', () => {
    const stId: number = service.getBaseStRenderer();
    const stRenderer: StRenderer = service.getRendererById(stId);
    service.renderById(stId);

    expect(stId).toEqual(stRenderer.stRendererId);
  });
});
