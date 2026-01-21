import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizComponent } from './viz.component';

@Component({
  imports: [VizComponent],
  template: `<app-viz [stRendererInputId]="1"></app-viz>`, // ✅ Provide input here
})
class TestHostComponent {}

describe('VizComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create viz component', () => {
    const vizComponent = fixture.debugElement.children[0].componentInstance;
    expect(vizComponent).toBeTruthy();
  });

  it('should initialize the component', () => {
    const component: VizComponent = fixture.debugElement.children[0].componentInstance;

    const isInitialized = component.setAsAttached();
    
    expect(isInitialized).toBeTrue();

  });

  it('should update the component attributes', () => {
    const updated = true;
    const width = 1000;
    const height = 1000;

    const component: VizComponent = fixture.debugElement.children[0].componentInstance;
    component.updateOld(updated, width, height);

    expect(component.oldWidth).toEqual(width);
    expect(component.oldHeight).toEqual(height);
  })

  it('should handle the signal effect and update the dimensions', () => {
      const component: VizComponent = fixture.debugElement.children[0].componentInstance;
      const rendererViewChild = component.rendererViewChild;
      const newWidth = 1000;
      const newHeight = 1000;
      const oldWidth = 100;
      const oldHeight = 100;
      const stRendererInputId = 1;

      const updated = component.updateDimensionsSignalHandler(
        rendererViewChild,
        newWidth,
        newHeight,
        oldWidth,
        oldHeight,
        stRendererInputId
      );

      expect(updated).toBe(true);

      const notUpdated = component.updateDimensionsSignalHandler(
        rendererViewChild,
        newWidth,
        newHeight,
        newWidth,
        newHeight,
        stRendererInputId
      );

      expect(notUpdated).toBe(true);


    })

    it('should handle dimension changes', () => {
      const component: VizComponent = fixture.debugElement.children[0].componentInstance;
      const result = component.dimensionChangeHandler(true);
      expect(result).toBe(true);
    })

});
