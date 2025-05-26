import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { fakeAsync, tick } from '@angular/core/testing';

import { StRendererService } from './services/st/renderer/st-renderer.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let stRendererService: StRendererService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    stRendererService = TestBed.inject(StRendererService);
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
