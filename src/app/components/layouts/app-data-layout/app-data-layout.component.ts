import {
  Component,
  inject,
  effect,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { CurrentRouteService } from '../../../services/utilities/routing/current-route.service';
import { RoutingLayoutType } from '../../../interfaces/st/routing/layout';
import { EntityFilterComponent } from './st/entity-filter/entity-filter.component';
import { EntityTableComponent } from './st/entity-table/entity-table.component';
import { ThreeTableComponent } from './three/three-table/three-table.component';

@Component({
  selector: 'app-data-layout',
  imports: [
    MatButtonToggleModule,
    EntityFilterComponent,
    EntityTableComponent,
    ThreeTableComponent
  ],
  templateUrl: './app-data-layout.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app-data-layout.component.scss',
})
export class AppDataLayoutComponent {
  currentRouteService: CurrentRouteService = inject(CurrentRouteService);

  layoutChange(event: MatButtonToggleChange): boolean {
    const eventValue: string = event.value;
    const routingLayoutType: RoutingLayoutType = "data";
    let routingLayoutDetailType: 'entities' | 'three' = 'three';

    if (eventValue !== 'three') {
      routingLayoutDetailType = 'entities';
    }

    this.currentRouteService.setRoutingDetail(routingLayoutType, routingLayoutDetailType);

    return true;
  }
}
