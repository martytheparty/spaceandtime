import { ElementRef, inject, Injectable } from '@angular/core';

import { RendererService } from '../../services/entities/three/renderer/renderer.service';

import * as THREE from 'three';
import { StRenderer } from '../../interfaces/st';
import { StRendererService } from '../../services/entities/st/renderer/st-renderer.service';

@Injectable({
  providedIn: 'root'
})
export class ComponentVisualizationService {

  rendererService: RendererService = inject(RendererService);
  stRendererService: StRendererService = inject(StRendererService);

  constructor() { }

  renderInNativeElement(
    elementRef: ElementRef,
    stId: number,
    width: number,
    height: number
  ): boolean {
    let success = false;

    const renderer: THREE.WebGLRenderer = this.rendererService.getRendererById(stId);
    const stRenderer: StRenderer = this.stRendererService.getRendererById(stId);
    this.render(
      renderer,
      stRenderer,
      elementRef,
      width,
      height
    );
    return success;
  }

  render(
    renderer: THREE.WebGLRenderer,
    stRenderer: StRenderer,
    elementRef: ElementRef,
    width: number,
    height: number
  ): boolean {
    let found = false;

    // additional logic to determine width and height

    if (renderer && stRenderer) {
      renderer.setSize(width, height);
      elementRef.nativeElement.appendChild(renderer.domElement);
      this.stRendererService.renderById(stRenderer.stRendererId, elementRef.nativeElement);
      found = true;
    }

    return found;
  }
}
