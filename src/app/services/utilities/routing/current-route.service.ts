import { inject, Injectable, Signal } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { LayoutType } from '../../../interfaces/layout/layout-types';
import { VisualizationService } from '../../entities/visualization/visualization.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentRouteService {

    private router = inject(Router);
    private visualizationService: VisualizationService = inject(VisualizationService);

    readonly currentRoute: Signal<LayoutType> = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() =>
        { 
          this.visualizationService.resetAllStVisualizationComponent();
          return this.getRoute(this.router.url);
        }
      )
    ),
    { initialValue: 'custom' } // required for signal init
  ) as Signal<LayoutType>;

  getRoute(url: string): LayoutType
  {
    let layoutType: LayoutType = '';
    const segments = url.split('/');
    
    if (segments.length > 1 && segments[1] != null) {
      layoutType = segments[1] as unknown as LayoutType;
    }

    return layoutType;
  }

}
