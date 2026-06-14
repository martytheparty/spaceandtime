import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityTableComponent } from './entity-table.component';
import { SequenceStTypes } from '../../../../../interfaces/base/dictionary/base-dicts';
import { StEntityTableRecord } from '../interfaces/st-entity-table-record';
import { RoutingLayoutDetailType } from '../../../../../interfaces/st/routing/layout';

describe('EntityTableComponent', () => {
  let component: EntityTableComponent;
  let fixture: ComponentFixture<EntityTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle row', () => {
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
    // creates a new entry
    let expanded = component.toggleRow(tableRow);

    expect(expanded).toBeTrue();
    // uses the existing entry
    expanded = component.toggleRow(tableRow);
    expect(expanded).toBeFalse();

  });

  it('applies filters for routingLayoutDetailType', () => {
    const routingLayoutDetailType: RoutingLayoutDetailType = 'entities';
    const records: StEntityTableRecord[] = [];

    let filteredRecords = component.applyFilters(routingLayoutDetailType, records);

    expect(filteredRecords.length).toBe(0);
  });

  it('filters based on the routerValue', () => {
    const routerValue: RoutingLayoutDetailType = "st-scene";
    const stEntityTableRecord: StEntityTableRecord = {
      type: "st-scene"
    } as unknown as StEntityTableRecord;
    const matchResult =  component.routeValueFilter(routerValue, stEntityTableRecord);

    expect(matchResult).toBeTrue();
  });



});
