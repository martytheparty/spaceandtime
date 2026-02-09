import { 
  Component,
  effect,
  inject,
  QueryList,
  ViewChildren
} from '@angular/core';

import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { VizComponent } from '../../viz/viz.component';

import { UiService } from '../../../services/ui/ui.service';
import { VisualizationService } from '../../../services/entities/visualization/visualization.service';
import { StRenderer } from '../../../interfaces/st';
import { CurrentRouteService } from '../../../services/utilities/routing/current-route.service';
import { LayoutType } from '../../../interfaces/layout/layout-types';
import { VizComponentLayoutClass } from '../../../services/utilities/positioning/viz-component-layout.class';
import { VizComponentService } from '../../../services/angular/viz-component.service';

@Component({
  selector: 'app-tabular-layout',
  imports: [
    VizComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app-tabular-layout.component.html',
  styleUrl: './app-tabular-layout.component.scss'
})
export class AppTabularLayoutComponent {
    @ViewChildren('visualizationItem') visualizationItems!: QueryList<VizComponent>;

    uiService: UiService = inject(UiService);
    visualizationService: VisualizationService = inject(VisualizationService);
    router: Router = inject(Router);
    currentRouteService: CurrentRouteService = inject(CurrentRouteService);

    vizComponentService: VizComponentService = inject(VizComponentService);
    vizComponentLayoutClass: VizComponentLayoutClass = new VizComponentLayoutClass();

    stRenderers: StRenderer[] = [];

   constructor() {
      effect(() => {
        // stRenderers should be empty unless we are in tabular view
        const currentView: LayoutType = this.currentRouteService.currentRoute();

        const newRenderers = this.getRenderers(currentView);
        this.stRenderers = [...newRenderers];

        setTimeout( () => {
          const vizCount = this.visualizationService.setupDomVisualizations(this.visualizationItems);

          this.vizComponentLayoutClass.updateVisualizationLayout(
            vizCount,
            this.visualizationService,
            this.vizComponentService
          );
        });
      });
    }

    getRenderers(currentView: LayoutType): StRenderer[]
    {
      let stRenderers: StRenderer[] = [];
      if (currentView === 'tabular') {
        stRenderers = this.uiService.stRenderersSignal();
      } else {
        stRenderers = [];
      }
      return stRenderers;
    }

    deleteRendererItem(stRendererId: number): boolean
    {   
      let deleted = this.uiService.deleteRenderer(stRendererId);
      // I don't think that this is needed so I commented it out
      //this.visualizationService.deleteVisualizationForRendererId(stRendererId);

      return deleted;
    }

    editRendererItem(stRendererId: number): boolean
    {      
      this.router.navigate(['/update', stRendererId]);
      return true;
    }

}
