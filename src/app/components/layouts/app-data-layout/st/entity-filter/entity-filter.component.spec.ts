import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityFilterComponent } from './entity-filter.component';

describe('EntityFilterComponent', () => {
  let component: EntityFilterComponent;
  let fixture: ComponentFixture<EntityFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
