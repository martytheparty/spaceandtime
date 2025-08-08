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

  it('should delete a render item', () => {
    let deleted = component.deleteRendererItem(1);
    // Deleted should be false because the renderer does not exist.
    expect(deleted).toBeFalse();
  })

  it('should edit a render item', () => {
    const fakeRendererId = 1;
    const edit = component.editRendererItem(fakeRendererId);

    expect(edit).toBeTrue();
    
  })
});
