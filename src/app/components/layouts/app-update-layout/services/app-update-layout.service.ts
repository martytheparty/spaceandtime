import {
  effect,
  inject,
  Injectable,
  Signal,
  WritableSignal,
  signal,
  Service
} from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';

import { 
  Event,
  Router
} from '@angular/router';
import { EditDimensions, UpdatePresentationModes } from '../interfaces/update-settings';
import { StRendererService } from '../../../../services/entities/st/renderer/st-renderer.service';
import { StRenderer, StVisualization } from '../../../../interfaces/st';
import { VisualizationService } from '../../../../services/entities/visualization/visualization.service';
import { VizComponentLayoutClass } from '../../../../services/utilities/positioning/viz-component-layout.class';

@Service({
  autoProvided: false
})
export class AppUpdateLayoutService {

  private router: Router = inject(Router);

  stRendererService: StRendererService = inject(StRendererService);
  stVisualizationService: VisualizationService = inject(VisualizationService);

  // Maintains and publishes editor state
  // first we need a signal that is the rendererId that is being displayed for update
  editRenderId: WritableSignal<number> = signal<number>(0);
  
  // update signal in general
  private readonly _presentationModeSignal: WritableSignal<UpdatePresentationModes> = signal<UpdatePresentationModes>("maximized");
  readonly presentationModeSignal: Signal<UpdatePresentationModes> = this._presentationModeSignal.asReadonly();

  private readonly _zoomValueSignal: WritableSignal<number> = signal<number>(100);
  readonly zoomValueSignal: Signal<number> = this._zoomValueSignal.asReadonly();

  // Properterty Specific Signals
  private readonly _editVisualizationWidthSignal: WritableSignal<number> = signal<number>(0);
  readonly editVisualizationWidthSignal: Signal<number> = this._editVisualizationWidthSignal.asReadonly();
  private readonly _editVisualizationHeightSignal: WritableSignal<number> = signal<number>(0);
  readonly editVisualizationHeightSignal: Signal<number> = this._editVisualizationHeightSignal.asReadonly();
  private readonly _editVisualizationTopSignal: WritableSignal<number> = signal<number>(0);
  readonly editVisualizationTopSignal: Signal<number> = this._editVisualizationTopSignal.asReadonly();
  private readonly _editVisualizationLeftSignal: WritableSignal<number> = signal<number>(0);
  readonly editVisualizationLeftSignal: Signal<number> = this._editVisualizationLeftSignal.asReadonly();

  // Routing Signal
  navigationSignal = toSignal( this.router.events );
  private readonly vizComponentLayoutClass: VizComponentLayoutClass = new VizComponentLayoutClass();

  constructor() {
    effect(() => {
      // 📞 navigation signal
      const event: Event = this.navigationSignal() as Event;

      // execute everything when signal changes
      this.presentationModeSignal();

      // 👟 code that execute when the signal runs
      this.publishEditUpdateRendererId(this.router, event);
    });    
  }

  togglePresentionMode(): UpdatePresentationModes {
    const presentationMode: UpdatePresentationModes = this.presentationModeSignal();  

    // 📢 publish signal
    if (presentationMode === 'configured') {
      this._presentationModeSignal.set('maximized');
    } else {
      this._presentationModeSignal.set('configured');
    }

    return this.presentationModeSignal();
  }

  changeZoomValue(zoomValue: number): number {
    // 📢 publish signal
    this._zoomValueSignal.set(zoomValue);
    return zoomValue;
  }

  publishEditUpdateRendererId(router: Router, event: Event): number {
    const routeInformation: string[] = router.url.split('/');
    let mode = this.getLayoutModeFromRouteInformation(routeInformation);
    let rendererIdString = this.getRenderIdStringFromRouteInformation(routeInformation);
    let rendererId = this.getEditNumericRendererId(rendererIdString, mode);

    // 📢 publish signal
    this.editRenderId.set(rendererId);

    return rendererId;
  }

  getLayoutModeFromRouteInformation( routeInformation: string[] ): string {
    const hasRouteInformation = this.checkForRouteInformation(routeInformation);
    let layoutMode = ""; // This is the layout mode (NOT the confMax Mode)
    
    if (hasRouteInformation) {
      layoutMode = routeInformation[1];
    }

    return layoutMode;
  }

  getEditNumericRendererId(rendererIdString: string, mode: string) {
    let rendererId = -1;

    if (mode === 'update') { // if not in update mode then is no edit render id
      const numeric = Number(rendererIdString);

      if (!Number.isNaN(numeric)) {
        rendererId = numeric;
      }
    }

    return rendererId;
  }

  getRenderIdStringFromRouteInformation( routeInformation: string[] ): string {
    const hasRouteInformation = this.checkForRouteInformation(routeInformation);
    let rendererIdString = "";
    
    if (hasRouteInformation) {
      rendererIdString = routeInformation[2];
    }

    return rendererIdString;
  }

  checkForRouteInformation(routeInformation: string[]): boolean {
    let hasInformation = false;

    if (routeInformation.length > 2) {
        hasInformation = true;
    }

    return hasInformation;
  }


  // This name is incomplete it determine AND publishes
  publishVisualizationDimensions(
    //appUpdateLayoutComponent: AppUpdateLayoutComponent,
    viewerViewDiv: HTMLDivElement
  ): boolean
  {

    const editDimenensions = this.getEditDimensions(viewerViewDiv);

    // 📢 publish signal
    this._editVisualizationHeightSignal.set(editDimenensions.height);
    this._editVisualizationWidthSignal.set(editDimenensions.width);
    this._editVisualizationTopSignal.set(editDimenensions.top);
    this._editVisualizationLeftSignal.set(editDimenensions.left);
    return true;
  }

  getEditDimensions(viewerViewDiv: HTMLDivElement): EditDimensions {
    const editDimenensions: EditDimensions = {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      presentationMode: this.presentationModeSignal()
    };
    // This is for max mode
    let canvasWidth = viewerViewDiv.offsetWidth;
    let canvasHeight = viewerViewDiv.offsetHeight;
    let visualizationLeft = 0;
    let visualizationTop = 0;

    if (this.presentationModeSignal() === 'configured') {
      const stRendererId = this.editRenderId();
      const stRenderer: StRenderer = this.stRendererService.getRendererById(stRendererId);
      const stVisualization: StVisualization | null = this.stVisualizationService.getStVisualizationByRendererId(stRendererId);

      if (stVisualization !== null) {
        visualizationLeft = stVisualization.stLeft;
        visualizationTop = stVisualization.stTop;
      }
      // These come from the renderer
      canvasWidth = stRenderer.stCanvasWidth;
      canvasHeight = stRenderer.stCanvasHeight;
    }

    editDimenensions.width = canvasWidth;
    editDimenensions.height = canvasHeight;
    editDimenensions.left = visualizationLeft;
    editDimenensions.top = visualizationTop;

    return editDimenensions;
  }

  reset(): void {
    // reset to default
    this._presentationModeSignal.set('maximized');
  }
}

