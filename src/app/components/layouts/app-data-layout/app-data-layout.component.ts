import { 
  Component,
  inject,
  effect,
} from '@angular/core';
import { StPublisherService } from '../../../services/entities/st/publish/st-publisher.service';
import { SequenceStTypes, SequenceDictionary, StTypes, ST_TYPES } from '../../../interfaces/base/dictionary/base-dicts';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { CurrentRouteService } from '../../../services/utilities/routing/current-route.service';
import { ROUTING_LAYOUT_DETAIL_TYPES, RoutingLayoutDetailType, RoutingLayoutType } from '../../../interfaces/st/routing/layout';
import { EntityFilterComponent } from './st/entity-filter/entity-filter.component';
import { EntityTableComponent } from './st/entity-table/entity-table.component';

@Component({
  selector: 'app-data-layout',
  imports: [
    MatButtonToggleModule,
    EntityFilterComponent,
    EntityTableComponent
  ],
  templateUrl: './app-data-layout.component.html',
  styleUrl: './app-data-layout.component.scss',
})
export class AppDataLayoutComponent {

  private stPublisherService: StPublisherService = inject(StPublisherService);
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



