import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMenuComponent } from './app-menu.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { ReflowType } from '../../interfaces/layout/reflow-types';

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
    const isOpen = component.showMenu();

    expect(isOpen).toBeTrue();
  } );


  it('should close the menu', () => {
    let isOpen = component.showMenu();

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

  it('should toggle reflow', () => {
    let reflow: ReflowType = 'always';

    reflow = component.toggleReflow(reflow);

    expect(reflow).toEqual("never");

    reflow = component.toggleReflow(reflow);

    expect(reflow).toEqual("always");
  });

  it('should set the menu focus', () => {
    const ranSuccessfully = component.setMenuFocus();
    expect(ranSuccessfully).toEqual(true);
  });
});
