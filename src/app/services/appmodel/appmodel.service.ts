import { Injectable, inject } from '@angular/core';
import { StVisualization } from '../../interfaces/st';
import { VisualizationService } from '../entities/visualization/visualization.service';
import { ReflowType } from '../../interfaces/layout/reflow-types';

@Injectable({
  providedIn: 'root'
})
export class AppModelService {

  reflow: ReflowType = 'always';

  setReflow(reflow: ReflowType): boolean
  {
    this.reflow = reflow;
    return true;
  } 

  getReflow(): ReflowType
  {
    return this.reflow;
  }
}
