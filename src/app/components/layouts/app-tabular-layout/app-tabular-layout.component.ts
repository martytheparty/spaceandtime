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
import { AnimationService } from '../../../services/animations/animation.service';
import { VisualizationService } from '../../../services/visualization/visualization.service';
import { StRenderer } from '../../../interfaces/st';

@Component({
  selector: 'app-app-tabular-layout',
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
    animationService: AnimationService = inject(AnimationService);
    visualizationService: VisualizationService = inject(VisualizationService);
    router: Router = inject(Router);

    stRenderers: StRenderer[] = [];

   constructor() {
      effect(() => {
        this.stRenderers = this.uiService.stRenderersSignal();
        this.animationService.animateVisualizations( this.stRenderers);
        setTimeout( () => {
          const vizCount = this.visualizationService.setupDomVisualizations(this.visualizationItems);

          this.animationService.updateVisualizationLayout(vizCount);
        });
      });
    }

    deleteRendererItem(stRendererId: number): boolean
    {      
      let deleted = this.uiService.deleteRenderer(stRendererId);
      this.visualizationService.deleteVisualizationForRendererId(stRendererId);

      return deleted;
    }

    editRendererItem(stRendererId: number): boolean
    {      
      this.router.navigate(['/update', stRendererId]);
      return true;
    }

}
