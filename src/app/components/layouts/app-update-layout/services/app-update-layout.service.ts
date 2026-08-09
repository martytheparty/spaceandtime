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
import { UpdatePresentaionModes } from '../interfaces/update-settings';

@Service({
  autoProvided: false
})
export class AppUpdateLayoutService {

  private router: Router = inject(Router);
  // Maintains and publishes editor state
  // first we need a signal that is the rendererId that is being displayed for update
  editRenderId: WritableSignal<number> = signal<number>(0);
  
  // Browser Driven Configs
  editVisualizationWidthSignal: WritableSignal<number> = signal<number>(0);
  editVisualizationHeightSignal: WritableSignal<number> = signal<number>(0);
  navigationSignal = toSignal( this.router.events );

  // User Defined Update Configs
  private readonly _zoomValueSignal: WritableSignal<number> = signal<number>(100);
  readonly zoomValueSignal: Signal<number> = this._zoomValueSignal.asReadonly();

  private readonly _presentationModeSignal: WritableSignal<UpdatePresentaionModes> = signal<UpdatePresentaionModes>("maximized");
  readonly presentationModeSignal: Signal<UpdatePresentaionModes> = this._presentationModeSignal.asReadonly();


  constructor() {
    effect(() => {
      // 📞 navigation signal
      const event: Event = this.navigationSignal() as Event;

      // 👟 code that execute when the signal runs
      this.publishEditUpdateRendererId(this.router, event);
    });    
  }

  togglePresentionMode(): UpdatePresentaionModes {
    const presentationMode: UpdatePresentaionModes = this.presentationModeSignal();  

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
    let mode = this.getModeFromRouteInformation(routeInformation);
    let rendererIdString = this.getRenderIdStringFromRouteInformation(routeInformation);
    let rendererId = this.getEditNumericRendererId(rendererIdString, mode);

    // 📢 publish signal
    this.editRenderId.set(rendererId);

    return rendererId;
  }

  getModeFromRouteInformation( routeInformation: string[] ): string {
    const hasRouteInformation = this.checkForRouteInformation(routeInformation);
    let mode = "";
    
    if (hasRouteInformation) {
      mode = routeInformation[1];
    }

    return mode;
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


  publishVisualizationDimensions(
    //appUpdateLayoutComponent: AppUpdateLayoutComponent,
    viewerViewDiv: HTMLDivElement
  ): boolean
  {
    // 📢 publish signal
    this.editVisualizationHeightSignal.set(viewerViewDiv.offsetHeight);
    this.editVisualizationWidthSignal.set(viewerViewDiv.offsetWidth);

    return true;
  }
}
