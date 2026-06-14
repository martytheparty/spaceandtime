import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeTableComponent, ThreeTableRecord } from './three-table.component';

describe('ThreeTableComponent', () => {
  let component: ThreeTableComponent;
  let fixture: ComponentFixture<ThreeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle', () => {
    const row: ThreeTableRecord = {
      threeType: 'scene',
      count: 1,
      json: "{}"
    };
    component.toggleRow(row);
    component.expandedRows = {'scene':true};
    component.toggleRow(row);
  })
});
