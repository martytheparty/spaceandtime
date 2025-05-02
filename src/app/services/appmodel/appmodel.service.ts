import { Injectable, inject } from '@angular/core';
import { StVisualization } from '../../interfaces/st';
import { VisualizationService } from '../visualization/visualization.service';

@Injectable({
  providedIn: 'root'
})
export class AppmodelService {

  editVisualization: StVisualization | undefined;
  stVisualizationService: VisualizationService = inject(VisualizationService);

  constructor() { }

  getVisualizations(): StVisualization[] {
    return this.stVisualizationService.getVisualizations();
  }

  setEditVisualization(stVisualization: StVisualization): void {
    this.editVisualization = stVisualization;
  }

  clearEditVisualization(): void {
    this.editVisualization = undefined;
  }
}
