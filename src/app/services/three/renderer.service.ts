import { inject, Injectable } from '@angular/core';
import * as THREE from 'three';
import { RecyclableSequenceService } from '../utilities/recyclable-sequence-service.service';

@Injectable({
  providedIn: 'root'
})
export class RendererService {

  private recyclableSequenceService: RecyclableSequenceService = inject(RecyclableSequenceService);
  private renderersDict: any = {};

  constructor() { }

  createRenderer(): number
  {
    const id = this.recyclableSequenceService.generateId();
    this.renderersDict[id] = new THREE.WebGLRenderer( { antialias: true } );
    return id;
  }

  getRendererForId(id: number): THREE.WebGLRenderer {
    return this.renderersDict[id];
  }
}
