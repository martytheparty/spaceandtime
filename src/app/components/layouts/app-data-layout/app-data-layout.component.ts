import { 
  Component,
  inject,
  effect,
  ViewChild,
  ElementRef,
  ɵɵsetComponentScope
} from '@angular/core';
import { StPublisherService } from '../../../services/entities/st/publish/st-publisher.service';
import { SequenceStTypes, SequenceDictionary, StTypes, ST_TYPES } from '../../../interfaces/base/dictionary/base-dicts';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CurrentRouteService } from '../../../services/utilities/routing/current-route.service';
import { ROUTING_LAYOUT_DETAIL_TYPES, RoutingLayoutDetailType, RoutingLayoutType } from '../../../interfaces/st/routing/layout';

@Component({
  selector: 'app-data-layout',
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './app-data-layout.component.html',
  styleUrl: './app-data-layout.component.scss',
})
export class AppDataLayoutComponent {

  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;

  private stPublisherService: StPublisherService = inject(StPublisherService);
  private currentRouteService: CurrentRouteService = inject(CurrentRouteService);

  rawEntitiesSelectData: readonly RoutingLayoutDetailType[] = ROUTING_LAYOUT_DETAIL_TYPES;
  entitiesSelectData: RoutingLayoutDetailType[] = this.populateMenu(ROUTING_LAYOUT_DETAIL_TYPES);

  sequenceDictionary: SequenceDictionary = {};
  stIds: string[] = [];
  tableRecords: StEntityTableRecord[] = []; // all records
  routeFilteredRecords: StEntityTableRecord[] = []; // records filtered based on route
  dataSource: MatTableDataSource<StEntityTableRecord> = new MatTableDataSource(this.tableRecords);
  displayedColumns: string[] = ["stId", "type", "json"];
  expandedRows: { [key: string]: boolean } = {};
  filterValueText = "";
  routeFilter: RoutingLayoutDetailType | undefined;


  constructor() {

    effect(
      () => {
        // signals
        // this.stPublisherService.visualizationIds()
        // this.stPublisherService.visualizationIdsHash()
        // this.currentRouteService.currentRoute()
        // 

        const route = this.currentRouteService.currentRoute();
        const routeLayoutDetailType: RoutingLayoutDetailType = this.currentRouteService.currentRouteType();


        this.setTableFilterBasedOnRoute(routeLayoutDetailType);
        
        this.sequenceDictionary = this.stPublisherService.visualizationIds();
        this.stIds = Object.keys(this.sequenceDictionary);

        const hash = this.stPublisherService.visualizationIdsHash();

        this.tableRecords = this.tabletransform(this.sequenceDictionary);

        // apply filters

        this.routeFilteredRecords = this.applyFilters(routeLayoutDetailType, this.tableRecords);
        this.applyUserFilter(this.filterValueText);
        this.dataSource.data = this.routeFilteredRecords; // filteredRecords

      });
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


  tabletransform(sequenceDictionary: SequenceDictionary): StEntityTableRecord[] {
    const stIds: string[] = Object.keys(sequenceDictionary);

    const tableRecords: StEntityTableRecord[] = stIds.map( (stId) => {
      const stRecord: SequenceStTypes =  sequenceDictionary[Number.parseInt(stId)];
      const stType: StTypes = stRecord?.type as StTypes;
      const json: string = JSON.stringify(stRecord, null, 1);
      const record: StEntityTableRecord = {
        stId,
        type: stType,
        json,
        stRecord,
      };

      return record;
    } );


    return tableRecords;
  }

  toggleRow(row: StEntityTableRecord): boolean {
    if (this.expandedRows[row.stId]) {
      this.expandedRows[row.stId] = !this.expandedRows[row.stId]  
    } else {
      this.expandedRows[row.stId] = true;
    }

    return this.expandedRows[row.stId];
  }

  menuChanged(routingLayoutDetailType: RoutingLayoutDetailType): boolean {
  
    const routingLayoutType: RoutingLayoutType = "data";

    return this.currentRouteService.setRoutingDetail(routingLayoutType, routingLayoutDetailType);

  }
}

export interface StEntityTableRecord {
  stId: string;
  type: StTypes;
  json: string;
  stRecord: SequenceStTypes
}

