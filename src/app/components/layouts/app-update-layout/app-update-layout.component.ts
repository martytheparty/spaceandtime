import {
  Component,
  ElementRef,
  effect,
  inject,
  ViewChild
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { VizComponent } from '../../viz/viz.component';
import { StRendererService } from '../../../services/st/renderer/st-renderer.service';
import { StPublisherService } from '../../../services/st/publish/st-publisher.service';
import { ThreePublisherService } from '../../../services/three/publish/three-publisher.service';
import { LayoutType } from '../../../interfaces/layout/layout-types';
import { CurrentRouteService } from '../../../services/utilities/current-route.service';

@Component({
  selector: 'app-update-layout',
  imports: [
    VizComponent
  ],
  templateUrl: './app-update-layout.component.html',
  styleUrl: './app-update-layout.component.scss'
})
export class AppUpdateLayoutComponent {

  @ViewChild('viewer') editorView : ElementRef | undefined;

  route: ActivatedRoute = inject(ActivatedRoute);
  stRendererService: StRendererService = inject(StRendererService);
  stPublisherService: StPublisherService = inject(StPublisherService);
  threePublisherService: ThreePublisherService = inject(ThreePublisherService);
  currentRouteService: CurrentRouteService = inject(CurrentRouteService);

  id: number = 0;
  viewerWidth = 0;
  viewerHeight = 0;
  afterInitComplete = false;
  calculatedAspectRatio = 0;

  constructor() {
    effect(() => {
      const ar = this.stPublisherService.calculatedAspectRatioSignal()[this.id];

      this.setCalculatedAspectRation(ar);

      // stRenderers should be empty unless we are in tabular view
      const currentView: LayoutType = this.currentRouteService.currentRoute();

      this.id = this.getCurrentVisualizationId(currentView, window.location.href);
      this.processVisualization(this);
    });
  }

  getCurrentVisualizationId(currentView: string, href: string): number {
    let id = 0;

    if (currentView === 'update') {
        const url = new URL(href);
        const segments = url.pathname.split('/');
        id = Number(segments[segments.length - 1]);
    }

    return id;
  }


  processVisualization(component: AppUpdateLayoutComponent): boolean {
    if (component.id > 0 && component.editorView?.nativeElement) {
      component.viewerWidth = component.editorView.nativeElement.offsetWidth;
      component.viewerHeight = component.editorView.nativeElement.offsetHeight;

      setTimeout(component.finalizeInitialization(component), 0 );
    }

    return true;
  }

  setCalculatedAspectRation(ar: number | undefined): number | undefined {
    if (ar) {
      this.calculatedAspectRatio = ar;
    }
    return ar;
  }

  finalizeInitialization(component: AppUpdateLayoutComponent): Function {
    return () => {
        // const stRenderer: StRenderer = component.stRendererService.getRendererById(component.id);
        component.afterInitComplete = true;
    };
  }



}
