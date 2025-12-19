import { Injectable, signal, inject } from '@angular/core';

import { StRenderer } from '../../interfaces/st';
import { VisualizationService } from '../entities/visualization/visualization.service';
import { StRendererService } from '../entities/st/renderer/st-renderer.service';
import { RecyclableSequenceService } from '../utilities/general/recyclable-sequence-service.service';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  stRendererService: StRendererService = inject(StRendererService);
  visualizationService: VisualizationService = inject(VisualizationService);
  recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);

  stRendererIdsSignal = signal<number[]>([]);
  stRenderersSignal = signal<StRenderer[]>([]);

  /*
    The purpose of this service it to compose commands accross entities - I think.
  */

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
    this.recyclableSequenceService.logSequenceDictionary();

    return deleted;
  }

  publishRendererChange(): boolean
  {
    const stRenderers: StRenderer[] = [...this.stRendererService.getRenderers()];

    this.stRenderersSignal.set(stRenderers);

    return true;

  }
}
