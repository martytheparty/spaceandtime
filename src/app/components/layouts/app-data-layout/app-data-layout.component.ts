import { 
  Component,
  inject,
  effect,
  ViewChild,
  ElementRef
} from '@angular/core';
import { StPublisherService } from '../../../services/entities/st/publish/st-publisher.service';
import { SequenceStTypes, SequenceDictionary, StTypes } from '../../../interfaces/base/dictionary/base-dicts';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-data-layout',
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './app-data-layout.component.html',
  styleUrl: './app-data-layout.component.scss',
})
export class AppDataLayoutComponent {

  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;

  private stPublisherService: StPublisherService = inject(StPublisherService);
  sequenceDictionary: SequenceDictionary = {};
  stIds: string[] = [];
  tableRecords: StEntityTableRecord[] = [];
  dataSource: MatTableDataSource<StEntityTableRecord> = new MatTableDataSource(this.tableRecords);
  displayedColumns: string[] = ["stId", "type", "json"];
  expandedRows: { [key: string]: boolean } = {};
  filterValueText = "";

  constructor() {
    effect(
      () => {
        this.sequenceDictionary = this.stPublisherService.visualizationIds();
        this.stIds = Object.keys(this.sequenceDictionary);

        const hash = this.stPublisherService.visualizationIdsHash();

        this.tableRecords = this.tabletransform(this.sequenceDictionary);
        this.dataSource.data = this.tableRecords;
        // use get filter
        this.applyFilter(this.filterValueText);
    });
  }

  applyFilter(filterValue: string): boolean {
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
}

export interface StEntityTableRecord {
  stId: string;
  type: StTypes;
  json: string;
  stRecord: SequenceStTypes
}

