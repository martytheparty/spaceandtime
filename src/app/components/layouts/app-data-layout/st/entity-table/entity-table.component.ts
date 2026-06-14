import {
  effect,
  inject,
  Component
} from '@angular/core';
import { EntityService } from '../services/entity-service.service';
import { StPublisherService } from '../../../../../services/entities/st/publish/st-publisher.service';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RoutingLayoutDetailType } from '../../../../../interfaces/st/routing/layout';
import { CurrentRouteService } from '../../../../../services/utilities/routing/current-route.service';
import { StEntityTableRecord } from '../interfaces/st-entity-table-record';

@Component({
  selector: 'app-entity-table',
  imports: [
    CommonModule,
    MatTableModule
  ],
  templateUrl: './entity-table.component.html',
  styleUrl: './entity-table.component.scss',
})
export class EntityTableComponent {
  entityService: EntityService = inject(EntityService);
  stPublisherService: StPublisherService = inject(StPublisherService);
  currentRouteService: CurrentRouteService = inject(CurrentRouteService); 

  displayedColumns: string[] = ["stId", "type", "json"];
  expandedRows: { [key: string]: boolean } = {};
  routeFilteredRecords: StEntityTableRecord[] = []; // records filtered based on route
  dataSource: MatTableDataSource<StEntityTableRecord> = new MatTableDataSource(this.entityService.tableRecords);
  filterValueText = "";

  // sequenceDictionary: SequenceDictionary = {};
  // tableRecords: StEntityTableRecord[] = []; // all records

  effectCount = 0;

  constructor() {

    effect(() => {
        // 📞 Gets a hash so we can know if there was a change in the data
        // this.stPublisherService.visualizationIdsHash();
        // 📞 Listens for filter changes
        // this.entityService.entityFilterValue();
        
        
        this.filterValueText = this.entityService.entityFilterValue();
        const hash = this.stPublisherService.visualizationIdsHash();
        // this.sequenceDictionary = this.stPublisherService.visualizationIds();
        this.entityService.updateTableData(this.stPublisherService.visualizationIds());
        this.effectCount++;

        // 🪄 apply filters
        const routeLayoutDetailType: RoutingLayoutDetailType = this.currentRouteService.currentRouteType();
        this.routeFilteredRecords = this.applyFilters(routeLayoutDetailType, this.entityService.tableRecords);
        this.applyUserFilter(this.filterValueText);
        this.dataSource.data = this.routeFilteredRecords; // filteredRecords
    })

  }

  toggleRow(row: StEntityTableRecord): boolean {
    if (this.expandedRows[row.stId]) {
      this.expandedRows[row.stId] = !this.expandedRows[row.stId]  
    } else {
      this.expandedRows[row.stId] = true;
    }

    return this.expandedRows[row.stId];
  }

  applyFilters(routeLayoutDetailType: RoutingLayoutDetailType, records: StEntityTableRecord[]): StEntityTableRecord[] {
    let filteredRecords: StEntityTableRecord[] = [];
    if(routeLayoutDetailType === 'entities') {
      filteredRecords = records;
    }
    else  {
      filteredRecords = this.applyRouterStTypeFilter(routeLayoutDetailType, records);
    }
    return filteredRecords;
  }

  applyRouterStTypeFilter(routerValue: RoutingLayoutDetailType, records: StEntityTableRecord[]): StEntityTableRecord[] {
    const filteredRecords: StEntityTableRecord[] 
    = records.filter( this.routeValueFilter.bind(this, routerValue));

    return filteredRecords;
  }

  routeValueFilter(routerValue: RoutingLayoutDetailType, stEntityTableRecord: StEntityTableRecord): boolean
  {   
    return stEntityTableRecord.type === routerValue;   
  }

  applyUserFilter(filterValue: string): boolean {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filterValueText = filterValue.trim().toLowerCase();
    return true;
  }

}
