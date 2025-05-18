import { Injectable, signal, inject } from '@angular/core';

import { StRendererService } from '../st/renderer/st-renderer.service';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  stRendererService: StRendererService = inject(StRendererService);

  stRendererIdsSignal = signal<number[]>([]);

  constructor() { }

  addViz(): number {
    const stRendererId = this.stRendererService.getBaseStRenderer();
    const stRendererIdList: number[] = [...this.stRendererIdsSignal()];
    stRendererIdList.push(stRendererId);

    this.stRendererIdsSignal.set(stRendererIdList);

    return stRendererId;
  }
}
