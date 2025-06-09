import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTabularLayoutComponent } from './app-tabular-layout.component';

describe('AppTabularLayoutComponent', () => {
  let component: AppTabularLayoutComponent;
  let fixture: ComponentFixture<AppTabularLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppTabularLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppTabularLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
