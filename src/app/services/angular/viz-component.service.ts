import { Injectable } from '@angular/core';
import { VizComponentDictionary } from '../../interfaces/base/dictionary/base-dicts';
import { VizComponent } from '../../components/viz/viz.component';

@Injectable({
  providedIn: 'root'
})
export class VizComponentService {
  // keeps track of viz componets by id.

  vizComponentDictionary: VizComponentDictionary = {};

  constructor() { }

  setVizComponentByStComponentId(ngVizComponent: VizComponent): number
  {
    this.vizComponentDictionary[ngVizComponent.stVizComponentId] = ngVizComponent;
    return ngVizComponent.stVizComponentId;
  }

  getVizComponentByStComponentId(ngComponentId: number): VizComponent
  {
    return this.vizComponentDictionary[ngComponentId];
  }

  deleteVizComponentByStComponentId(ngComponentId: number): boolean
  {
    // remember this does not delete the component, just the reference
    delete this.vizComponentDictionary[ngComponentId];
    return true;
  }

}
