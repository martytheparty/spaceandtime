import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDataLayoutComponent } from './app-data-layout.component';
import { SequenceDictionary, SequenceStTypes } from '../../../interfaces/base/dictionary/base-dicts';
import { RoutingLayoutDetailType } from '../../../interfaces/st/routing/layout';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

describe('AppDataLayoutComponent', () => {
  let component: AppDataLayoutComponent;
  let fixture: ComponentFixture<AppDataLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDataLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDataLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the layout', () => {
    const event: MatButtonToggleChange = { value: '' } as MatButtonToggleChange;
    const result = component.layoutChange(event);
    expect(result).toBeTrue();
  })

  // it('should toggle row', () => {
  //   const stRecord: SequenceStTypes = {
  //     type: 'st-renderer',
  //     stRendererId: 1,
  //     stWidth: 200,
  //     stHeight: 200,
  //     stCameraId: 2,
  //     stSceneId: 3,
  //     deleted: false
  //   };

  //   const tableRow: StEntityTableRecord = {
  //     stId: '1',
  //     type: 'st-renderer',
  //     json: '{}',
  //     stRecord
  //   };
  //   // creates a new entry
  //   let expanded = component.toggleRow(tableRow);

  //   expect(expanded).toBeTrue();
  //   // uses the existing entry
  //   expanded = component.toggleRow(tableRow);
  //   expect(expanded).toBeFalse();

  // });

  // it('should tranform the dictionary', () => {
  //   const stRecord: SequenceStTypes = {
  //     type: 'st-renderer',
  //     stRendererId: 1,
  //     stWidth: 200,
  //     stHeight: 200,
  //     stCameraId: 2,
  //     stSceneId: 3,
  //     deleted: false
  //   };

  //   const tableRow: StEntityTableRecord = {
  //     stId: '1',
  //     type: 'st-renderer',
  //     json: '{}',
  //     stRecord
  //   };

  //   const sequenceDictionary: SequenceDictionary = {'1': stRecord };

  //   let records = component.tabletransform(sequenceDictionary);

  //   expect(records.length).toEqual(1);

  // });

  // it('sets the table filter based on the route', () => {
  //   const routingLayoutDetailType: RoutingLayoutDetailType = 'entities';

  //   let result = component.setTableFilterBasedOnRoute(routingLayoutDetailType);

  //   expect(result).toBeTrue();
  // });

  // it('applies filters for routingLayoutDetailType', () => {
  //   const routingLayoutDetailType: RoutingLayoutDetailType = 'entities';
  //   const records: StEntityTableRecord[] = [];

  //   let filteredRecords = component.applyFilters(routingLayoutDetailType, records);

  //   expect(filteredRecords.length).toBe(0);
  // });

  // it('filters based on the routerValue', () => {
  //   const routerValue: RoutingLayoutDetailType = "st-scene";
  //   const stEntityTableRecord: StEntityTableRecord = {
  //     type: "st-scene"
  //   } as unknown as StEntityTableRecord;
  //   const matchResult =  component.routeValueFilter(routerValue, stEntityTableRecord);

  //   expect(matchResult).toBeTrue();
  // });

  // it('handles menu changes', () => {
  //   const routingLayoutDetailType: RoutingLayoutDetailType = "st-animation";

  //   const menuResult = component.menuChanged(routingLayoutDetailType); 

  //   expect(menuResult).toBeTrue();
  // });

});
