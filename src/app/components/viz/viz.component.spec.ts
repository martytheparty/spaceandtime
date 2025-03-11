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

});
