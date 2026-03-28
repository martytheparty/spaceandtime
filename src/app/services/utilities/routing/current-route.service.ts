import { inject, Injectable, Signal } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { LayoutType } from '../../../interfaces/layout/layout-types';
import { VisualizationService } from '../../entities/visualization/visualization.service';
import { StTypes } from '../../../interfaces/base/dictionary/base-dicts';
import { RoutingLayoutDetailType, RoutingLayoutType } from '../../../interfaces/st/routing/layout';

@Injectable({
  providedIn: 'root'
})
export class CurrentRouteService {

    private router = inject(Router);
    private visualizationService: VisualizationService = inject(VisualizationService);

    readonly currentRoute: Signal<RoutingLayoutType> = toSignal(
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
    ) as Signal<RoutingLayoutType>;

    // I need to return st-animation when the URL is http://localhost:4200/data/st-animation
    readonly currentRouteType: Signal<RoutingLayoutDetailType> = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() =>
        { 
          // no need to call again is always called for the currentRoute Subscription
          // this.visualizationService.resetAllStVisualizationComponent();
          return this.getDetailTypeFromRoute(this.router.url);
        }
      )
    ),
    { initialValue: '' } // required for signal init
    ) as Signal<RoutingLayoutDetailType>;

  getRoute(url: string): RoutingLayoutType
  {
    let layoutType: RoutingLayoutType = 'custom';
    const segments = url.split('/');
    
    if (segments.length > 1 && segments[1] != null) {
      layoutType = segments[1] as unknown as RoutingLayoutType;
    }

    return layoutType;
  }

  getDetailTypeFromRoute(url: string): RoutingLayoutDetailType {
    let routingLayoutType: RoutingLayoutDetailType = '';
    const segments = url.split('/');

    // assume the last segment is the st-type
    if(segments.length > 0) {
      // sometimes this won't be an StTypes
      routingLayoutType = segments.pop() as unknown as RoutingLayoutDetailType;
    }

    return routingLayoutType;
  }

  setRoutingDetail(routingLayoutType: RoutingLayoutType, routingLayoutDetailType: RoutingLayoutDetailType): boolean {
    this.router.navigate([routingLayoutType, routingLayoutDetailType]);
    return true;
  }

}
