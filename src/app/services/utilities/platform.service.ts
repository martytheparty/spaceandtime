import { Injectable, inject } from '@angular/core';
import { VisualizationService } from '../visualization/visualization.service';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  eventsInitialized = false;

  visualizationService: VisualizationService = inject(VisualizationService);

  constructor() { }

  calculateVisualizationPositions = () => {
    this.visualizationService.calculatePositions();
  };
  
  setEvents(): void {
    
    if (!this.eventsInitialized) {
      window.addEventListener('resize', this.calculateVisualizationPositions);

      this.eventsInitialized = true;
    }
  }


}
