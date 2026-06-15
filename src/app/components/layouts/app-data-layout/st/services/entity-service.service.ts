import { 
  signal,
  Injectable,
  WritableSignal
} from '@angular/core';

import {
  SequenceDictionary,
  SequenceStTypes,
  StTypes
} from '../../../../../interfaces/base/dictionary/base-dicts';
import { StEntityTableRecord } from '../interfaces/st-entity-table-record';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  entityFilterValue: WritableSignal<string> = signal<string>('');
  
  filteredTableRecords: WritableSignal<StEntityTableRecord[]> = signal<StEntityTableRecord[]>([]);
  tableRecords: StEntityTableRecord[] = []; // all records

  publishFilterChange(filterValue: string): boolean
  {
    // 📢 Publish The Filter Value
    this.entityFilterValue.set(filterValue);
    return true;
  }

  updateTableData(sequenceDictionary: SequenceDictionary): boolean {
    this.tableRecords = this.tabletransform(sequenceDictionary);

    return true;
  }

  tabletransform(sequenceDictionary: SequenceDictionary): StEntityTableRecord[] {
    const stIds: string[] = Object.keys(sequenceDictionary);

    const tableRecords: StEntityTableRecord[] = stIds.map( (stId) => {
      const stRecord: SequenceStTypes =  sequenceDictionary[Number.parseInt(stId)];
      const stType: StTypes = stRecord?.type as StTypes;
      const json: string = JSON.stringify(stRecord, null, 2);
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
}
