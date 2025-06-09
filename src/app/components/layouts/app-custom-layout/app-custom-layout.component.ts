import { Component, effect, inject, QueryList, ViewChildren } from '@angular/core';

import { StRenderer } from '../../../interfaces/st';

import { UiService } from '../../../services/ui/ui.service';
import { AnimationService } from '../../../services/animations/animation.service';
import { VisualizationService } from '../../../services/visualization/visualization.service';

import { VizComponent } from '../../viz/viz.component';

@Component({
  selector: 'app-custom-layout',
  imports: [VizComponent],
  templateUrl: './app-custom-layout.component.html',
  styleUrl: './app-custom-layout.component.scss'
})
export class AppCustomLayoutComponent {
    @ViewChildren('visualizationItem') visualizationItems!: QueryList<VizComponent>;

    uiService: UiService = inject(UiService);
    animationService: AnimationService = inject(AnimationService);
    visualizationService: VisualizationService = inject(VisualizationService);

    stRenderers: StRenderer[] = [];

    constructor() {

      effect(() => {
        this.stRenderers = this.uiService.stRenderersSignal();
        this.animationService.animateVisualizations( this.stRenderers);
        setTimeout( () => {
          this.visualizationService.setupDomVisualizations(this.visualizationItems);
        });
      });

    }




}
