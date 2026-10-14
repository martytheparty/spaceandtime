import {
  inject,
  Component,
  ChangeDetectionStrategy,
  ViewChildren,
  QueryList,
  effect
} from '@angular/core';

import { AppUpdateLayoutService } from '../services/app-update-layout.service';
import { WViewPortResizeService } from '../../../../services/ui/w-view-port-resize.service';
import { VizComponent } from '../../../viz/viz.component';
import { VisualizationService } from '../../../../services/entities/visualization/visualization.service';
import { VizComponentService } from '../../../../services/angular/viz-component.service';
import { VizComponentLayoutClass } from '../../../../services/utilities/positioning/viz-component-layout.class';


@Component({
  selector: 'app-update-layout-viewer',
  imports: [
    VizComponent
  ],
  templateUrl: './app-update-layout-viewer.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app-update-layout-viewer.component.scss',
})
export class AppUpdateLayoutViewerComponent {
    @ViewChildren('visualizationItem') visualizationItems!: QueryList<VizComponent>;
    // scoped to the app-update-layout
    appUpdateLayoutService: AppUpdateLayoutService = inject(AppUpdateLayoutService);
    // singleton
    wViewPortResizeService: WViewPortResizeService = inject( WViewPortResizeService);
    visualizationService: VisualizationService = inject(VisualizationService);
    vizComponentService: VizComponentService = inject(VizComponentService);
    vizComponentLayoutClass: VizComponentLayoutClass = new VizComponentLayoutClass();

    constructor(){
      effect( () => {
        this.appUpdateLayoutService.editRenderId();
        this.handleRenderEditChange(this.appUpdateLayoutService.editRenderId());
      })
    }

    handleRenderEditChange(stRendererId: number): void {
      if (stRendererId > 0) {
        setTimeout( () => {
            const vizCount = this.visualizationService.setupDomVisualizations(this.visualizationItems); 
            this.vizComponentLayoutClass.updateVisualizationLayout(
                vizCount,
                this.visualizationService,
                this.vizComponentService,
            ); // not sure if this is necessary   
        } );
      } 
    }
}
