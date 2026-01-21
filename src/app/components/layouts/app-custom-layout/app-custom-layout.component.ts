import { Component, effect, inject, QueryList, ViewChildren } from '@angular/core';

import { StRenderer } from '../../../interfaces/st';

import { UiService } from '../../../services/ui/ui.service';
import { AnimationService } from '../../../services/entities/animations/animation.service';
import { VisualizationService } from '../../../services/entities/visualization/visualization.service';

import { VizComponent } from '../../viz/viz.component';
import { CurrentRouteService } from '../../../services/utilities/routing/current-route.service';
import { LayoutType } from '../../../interfaces/layout/layout-types';

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
    currentRouteService: CurrentRouteService = inject(CurrentRouteService);

    stRenderers: StRenderer[] = [];

    constructor() {
      effect(() => {

        // stRenderers should be empty unless we are in custom view
        const currentView: LayoutType = this.currentRouteService.currentRoute();
        this.stRenderers = [...this.getRenderers(currentView)];

        setTimeout( () => {
          const vizCount = this.visualizationService.setupDomVisualizations(this.visualizationItems);

          this.animationService.updateVisualizationLayout(vizCount); // not sure if this is necessary
        });
      });
    }

    getRenderers(currentView: LayoutType):StRenderer[]
    {
      let stRenderers: StRenderer[] = [];
      
      if (currentView === 'custom' || currentView === '') {
        stRenderers = this.uiService.stRenderersSignal();
      } else {
        stRenderers = [];
      }
      return stRenderers;
    }
}
