import {
  Component,
  ElementRef,
  effect,
  inject,
  ViewChild
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { VizComponent } from '../../viz/viz.component';
import { StRendererService } from '../../../services/entities/st/renderer/st-renderer.service';
import { StPublisherService } from '../../../services/entities/st/publish/st-publisher.service';
import { ThreePublisherService } from '../../../services/entities/three/publish/three-publisher.service';
import { LayoutType } from '../../../interfaces/layout/layout-types';
import { CurrentRouteService } from '../../../services/utilities/routing/current-route.service';
import { WViewPortResizeService } from '../../../services/ui/w-view-port-resize.service';

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
   wViewPortResizeService: WViewPortResizeService = inject( WViewPortResizeService);

  stRendererId: number = 0;
  viewerWidth = 0;
  viewerHeight = 0;
  afterInitComplete = false;
  calculatedAspectRatio = 0;

  constructor() {
    effect(() => {


      const { width, height } = this.wViewPortResizeService.viewport();
      this.viewerWidth = width;
      this.viewerHeight = height;

      const ar = this.stPublisherService.calculatedAspectRatioSignal()[this.stRendererId];

      this.setCalculatedAspectRation(ar);

      // stRenderers should be empty unless we are in tabular view
      const currentView: LayoutType = this.currentRouteService.currentRoute();

      this.stRendererId = this.getCurrentRendererId(currentView, window.location.href);
      this.processVisualization(this);
    });
  }

  getCurrentRendererId(currentView: string, href: string): number {
    let stRendererId = 0;

    if (currentView === 'update') {
        const url = new URL(href);
        const segments = url.pathname.split('/');
        stRendererId = Number(segments[segments.length - 1]);
    }

    return stRendererId;
  }


  processVisualization(appLayoutComponent: AppUpdateLayoutComponent): boolean {
    const isStRendererCreated = this.isStRendererCreated(appLayoutComponent);
    const editorDomElementExists = this.doesEditorViewDomElementExist(appLayoutComponent);

    return this.updateStVisualizationSize(appLayoutComponent, isStRendererCreated, editorDomElementExists);
  }

  updateStVisualizationSize(
    appLayoutComponent: AppUpdateLayoutComponent,
    isStRendererCreated: boolean,
    editorDomElementExists: boolean
  ): boolean {
    let updated = false;
    if (isStRendererCreated && editorDomElementExists) {
      const editorView: ElementRef<HTMLDivElement> = appLayoutComponent.editorView as unknown as ElementRef<HTMLDivElement>;
      const nativeElement: HTMLDivElement = editorView.nativeElement as unknown as HTMLDivElement;
      this.resizeVisualization(appLayoutComponent, nativeElement);
      updated = true;
    }
    return updated;
  }

  doesEditorViewDomElementExist(appLayoutComponent: AppUpdateLayoutComponent): boolean {
    let exists = false;

    if(appLayoutComponent.editorView?.nativeElement) {
      exists = true;
    }

    return exists;
  }

  isStRendererCreated(appLayoutComponent: AppUpdateLayoutComponent): boolean {
    let created = false;

    if (appLayoutComponent.stRendererId > 0) {
      created = true;
    }

    return created;
  }

  resizeVisualization(appUpdateLayoutComponent: AppUpdateLayoutComponent, editorViewDiv: HTMLDivElement): boolean
  {
      
      appUpdateLayoutComponent.viewerWidth = editorViewDiv.offsetWidth;
      appUpdateLayoutComponent.viewerHeight = editorViewDiv.offsetHeight;

      setTimeout(appUpdateLayoutComponent.finalizeInitialization(appUpdateLayoutComponent), 0 );
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
