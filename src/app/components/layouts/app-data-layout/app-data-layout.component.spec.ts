import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDataLayoutComponent, StEntityTableRecord } from './app-data-layout.component';
import { SequenceDictionary, SequenceStTypes } from '../../../interfaces/base/dictionary/base-dicts';

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

    let records = component.tabletransform(sequenceDictionary);

    expect(records.length).toEqual(1);

  });

});
