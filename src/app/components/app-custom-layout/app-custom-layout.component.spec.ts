import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCustomLayoutComponent } from './app-custom-layout.component';

fdescribe('AppCustomLayoutComponent', () => {
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
});
