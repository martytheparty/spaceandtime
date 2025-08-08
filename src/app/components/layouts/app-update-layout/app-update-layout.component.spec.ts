import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUpdateLayoutComponent } from './app-update-layout.component';

describe('AppUpdateLayoutComponent', () => {
  let component: AppUpdateLayoutComponent;
  let fixture: ComponentFixture<AppUpdateLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppUpdateLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppUpdateLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
