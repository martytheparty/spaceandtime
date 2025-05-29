import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLayoutMenuComponent } from './app-layout-menu.component';
import { LayoutType } from '../../interfaces/layout/layout-types';

describe('AppLayoutMenuComponent', () => {
  let component: AppLayoutMenuComponent;
  let fixture: ComponentFixture<AppLayoutMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppLayoutMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppLayoutMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle layout', () => {
    let layout: LayoutType = component.toggle();

    expect(layout).toEqual('tabular');

    layout = component.toggle();
    expect(layout).toEqual('custom');
  })
});
