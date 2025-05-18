import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMenuComponent } from './app-menu.component';
import { MatMenuTrigger } from '@angular/material/menu';

describe('AppMenuComponent', () => {
  let component: AppMenuComponent;
  let fixture: ComponentFixture<AppMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the menu', () => {
    const e: Event = {} as Event;
    const mmt: MatMenuTrigger = {} as MatMenuTrigger;
    const isOpen = component.showMenu(e, mmt);

    expect(isOpen).toBeTrue();
  } );


  it('should close the menu', () => {
    const e: Event = {} as Event;
    const mmt: MatMenuTrigger = {} as MatMenuTrigger;
    let isOpen = component.showMenu(e, mmt);

    expect(isOpen).toBeTrue();

    isOpen = component.closeHandler();

    expect(isOpen).toBeFalse();
  } );

  it('should add a Visualization', () => {
    const vizAdded = component.addVisualization();

    expect(vizAdded).toBeTruthy();
  });

  it('should execute click viz handler', () => {

    const mockEvent = {
      preventDefault: () => {},
      stopPropagation: () => {}
    } as unknown as Event;

    const vizAdded = component.addClickVizHandler(mockEvent);

    expect(vizAdded).toBeTruthy();
  });
});
