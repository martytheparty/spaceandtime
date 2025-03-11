import { ElementRef, inject, Injectable } from '@angular/core';

import { RendererService } from '../../services/three/renderer/renderer.service';
import { StRendererService } from '../../services/st/renderer/st-renderer.service';

import * as THREE from 'three';
import { StRenderer } from '../../interfaces/st';

@Injectable({
  providedIn: 'root'
})
export class ComponentVisualizationService {

  rendererService: RendererService = inject(RendererService);
  stRendererService: StRendererService = inject(StRendererService);

  constructor() { }

  renderInNativeElement(elementRef: ElementRef, stId: number): boolean {
    let success = false;

    const renderer: THREE.WebGLRenderer = this.rendererService.getRendererById(stId);
    const stRenderer: StRenderer = this.stRendererService.getRendererById(stId);
    if (renderer && stRenderer) {
      renderer.setSize(stRenderer.stWidth, stRenderer.stHeight);
      elementRef.nativeElement.appendChild(renderer.domElement);
      this.stRendererService.renderById(stId);
      success = true;
    }

    return success;
  }
}
