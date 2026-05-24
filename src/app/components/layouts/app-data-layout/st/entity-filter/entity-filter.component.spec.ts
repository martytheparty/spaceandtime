import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityFilterComponent } from './entity-filter.component';
import { RoutingLayoutDetailType } from '../../../../../interfaces/st/routing/layout';

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

  it('sets the table filter based on the route', () => {
    const routingLayoutDetailType: RoutingLayoutDetailType = 'entities';
    let result = component.setTableFilterBasedOnRoute(routingLayoutDetailType);

    expect(result).toBeTrue();
  });

  it('should handle menu changes', () => {
    const result = component.menuChanged("");
 
    expect(result).toBeTrue();
  });
});
