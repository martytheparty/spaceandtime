import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUpdateLayoutEditorComponent } from './app-update-layout-editor.component';

describe('AppUpdateLayoutEditorComponent', () => {
  let component: AppUpdateLayoutEditorComponent;
  let fixture: ComponentFixture<AppUpdateLayoutEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppUpdateLayoutEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppUpdateLayoutEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
