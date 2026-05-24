import { TestBed } from '@angular/core/testing';

import { EntityService } from './entity-service.service';
import { SequenceDictionary, SequenceStTypes } from '../../../../../interfaces/base/dictionary/base-dicts';
import { StEntityTableRecord } from '../interfaces/st-entity-table-record';

describe('EntityServiceService', () => {
  let service: EntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should tranform the dictionary', () => {
    const stRecord: SequenceStTypes = {
      type: 'st-renderer',
      stRendererId: 1,
      stWidth: 200,
      stHeight: 200,
      stCameraId: 2,
      stSceneId: 3,
      deleted: false
    };

    const tableRow: StEntityTableRecord = {
      stId: '1',
      type: 'st-renderer',
      json: '{}',
      stRecord
    };

    const sequenceDictionary: SequenceDictionary = {'1': stRecord };

    let records = service.tabletransform(sequenceDictionary);

    expect(records.length).toEqual(1);

  });

  it('publish filter changes', () => {
    const result = service.publishFilterChange("aaa");
    expect(result).toBeTrue();
  })

});
