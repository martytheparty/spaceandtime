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

  it('shoud clear renderers if not custom view', () => {
    component.getRenderers('');
    const renderers = component.getRenderers('tabular');

    expect(renderers.length).toEqual(0);
  });

});
