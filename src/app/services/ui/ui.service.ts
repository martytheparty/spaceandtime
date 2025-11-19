import { Injectable, signal, inject } from '@angular/core';

import { StRenderer } from '../../interfaces/st';
import { VisualizationService } from '../entities/visualization/visualization.service';
import { StRendererService } from '../entities/st/renderer/st-renderer.service';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  stRendererService: StRendererService = inject(StRendererService);
  visualizationService: VisualizationService = inject(VisualizationService);

  stRendererIdsSignal = signal<number[]>([]);
  stRenderersSignal = signal<StRenderer[]>([]);

  constructor() { }

  addRenderer(): number {
    const stRendererId = this.stRendererService.getBaseStRenderer();
    this.publishRendererChange();
    return stRendererId;
  }

  deleteRenderer(stRendererId: number): boolean
  {
    let deleted = false;
    
    deleted = this.stRendererService.deleteRenderer(stRendererId);
    this.visualizationService.pruneVisualizationsByRendererId(stRendererId);

    this.publishRendererChange();
    return deleted;
  }

  publishRendererChange(): boolean
  {
    const stRenderers: StRenderer[] = [...this.stRendererService.getRenderers()];

    this.stRenderersSignal.set(stRenderers);

    return true;

  }
}
