import { 
  Component,
  effect,
  inject
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ROUTING_LAYOUT_DETAIL_TYPES, RoutingLayoutDetailType, RoutingLayoutType } from '../../../../../interfaces/st/routing/layout';
import { CurrentRouteService } from '../../../../../services/utilities/routing/current-route.service';
import { EntityService } from '../services/entity-service.service';

@Component({
  selector: 'app-entity-filter',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './entity-filter.component.html',
  styleUrl: './entity-filter.component.scss',
})
export class EntityFilterComponent {
  entityService: EntityService = inject(EntityService);
  currentRouteService: CurrentRouteService = inject(CurrentRouteService);
  routeFilter: RoutingLayoutDetailType | undefined;
  rawEntitiesSelectData: readonly RoutingLayoutDetailType[] = ROUTING_LAYOUT_DETAIL_TYPES;
  entitiesSelectData: RoutingLayoutDetailType[] = this.populateMenu(ROUTING_LAYOUT_DETAIL_TYPES);


  constructor() {
    effect( () => {
        const routeLayoutDetailType: RoutingLayoutDetailType = this.currentRouteService.currentRouteType();
        this.setTableFilterBasedOnRoute(routeLayoutDetailType);
    } );
  }

  menuChanged(routingLayoutDetailType: RoutingLayoutDetailType): boolean {
  
    const routingLayoutType: RoutingLayoutType = "data";

    return this.currentRouteService.setRoutingDetail(routingLayoutType, routingLayoutDetailType);
  }

  populateMenu(rawEntitiesSelectData: readonly RoutingLayoutDetailType[]): RoutingLayoutDetailType[] {
    // filter out the blank and move entities to the top

    // 1) filter out the blank

    let filteredMenuResults = [...rawEntitiesSelectData];

    filteredMenuResults = filteredMenuResults.filter( 
      (layoutType: RoutingLayoutDetailType) => {
        let keep = true;

        if (layoutType === "") {
          keep = false;
        }

        return keep;
      } 
    );


    // 2) Move entitites to the first spot
    return filteredMenuResults.sort();
  }

  setTableFilterBasedOnRoute(routeLayoutDetailType: RoutingLayoutDetailType): boolean
  {
    let wasSet = false;

    if (routeLayoutDetailType !== "") {
      this.routeFilter = routeLayoutDetailType;
      wasSet = true;
    }  

    return wasSet;
  }
}


