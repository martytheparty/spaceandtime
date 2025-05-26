import { Injectable, signal, inject } from '@angular/core';

import { StRendererService } from '../st/renderer/st-renderer.service';
import { StRenderer } from '../../interfaces/st';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  stRendererService: StRendererService = inject(StRendererService);

  stRendererIdsSignal = signal<number[]>([]);
  stRenderersSignal = signal<StRenderer[]>([]);

  constructor() { }

  addViz(): number {
    const stRendererId = this.stRendererService.getBaseStRenderer();
    const stRendererIdList: number[] = [...this.stRendererService.getRendererIds()];
    const stRenderers: StRenderer[] = [...this.stRendererService.getRenderers()];

    this.stRendererIdsSignal.set(stRendererIdList);
    this.stRenderersSignal.set(stRenderers);

    return stRendererId;
  }
}
