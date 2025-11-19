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

  setVizComponentByStComponentId(vizComponent: VizComponent): number
  {
    this.vizComponentDictionary[vizComponent.stVizComponentId] = vizComponent;
    return vizComponent.stVizComponentId;
  }

  getVizComponentByStComponentId(stComponentId: number): VizComponent
  {
    return this.vizComponentDictionary[stComponentId];
  }

  deleteVizComponentByStComponentId(stComponentId: number): boolean
  {
    // remember this does not delete the component, just the reference
    delete this.vizComponentDictionary[stComponentId];
    return true;
  }

}
