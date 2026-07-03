import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUpdateLayoutViewerComponent } from './app-update-layout-viewer.component';

describe('AppUpdateLayoutViewerComponent', () => {
  let component: AppUpdateLayoutViewerComponent;
  let fixture: ComponentFixture<AppUpdateLayoutViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppUpdateLayoutViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppUpdateLayoutViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
