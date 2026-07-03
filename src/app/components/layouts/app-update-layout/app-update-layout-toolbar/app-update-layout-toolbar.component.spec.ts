import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUpdateLayoutToolbarComponent } from './app-update-layout-toolbar.component';

describe('AppUpdateLayoutToolbarComponent', () => {
  let component: AppUpdateLayoutToolbarComponent;
  let fixture: ComponentFixture<AppUpdateLayoutToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppUpdateLayoutToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppUpdateLayoutToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
