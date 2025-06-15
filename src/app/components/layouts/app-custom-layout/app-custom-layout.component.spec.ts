import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCustomLayoutComponent } from './app-custom-layout.component';

describe('AppCustomLayoutComponent', () => {
  let component: AppCustomLayoutComponent;
  let fixture: ComponentFixture<AppCustomLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCustomLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppCustomLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the visualization layout', () => {
    const vizCount = 5;
    const result = component.updateVisualizationLayout(vizCount);

    expect(vizCount).toEqual(result);
  });
});
