import {
  Component,
  inject
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

// generic libs
import { AnimationService } from './services/entities/animations/animation.service';

// utility libs
import { PlatformService } from './services/utilities/positioning/platform.service';

// components
import { AppLayoutMenuComponent } from './components/app-layout-menu/app-layout-menu.component';
import { AppCustomLayoutComponent } from './components/layouts/app-custom-layout/app-custom-layout.component';
import { AppMenuComponent } from './components/app-menu/app-menu.component';
import { AppTabularLayoutComponent } from './components/layouts/app-tabular-layout/app-tabular-layout.component';
import { AppUpdateLayoutComponent } from './components/layouts/app-update-layout/app-update-layout.component';
import { CurrentRouteService } from './services/utilities/routing/current-route.service';

@Component({
  selector: 'app-root',
  imports: [
    AppCustomLayoutComponent,
    AppLayoutMenuComponent,
    AppMenuComponent,
    AppTabularLayoutComponent,
    AppUpdateLayoutComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent
 {
  animationService: AnimationService = inject(AnimationService);
  platformService: PlatformService = inject(PlatformService);
  currentRouteService: CurrentRouteService = inject(CurrentRouteService)

  constructor() {
    this.setupAnimationDrawingLoop();
    this.platformService.setEvents();
    
  }

  layoutLoop = () => {
      // note: RequestAnimationFrame is browserspecific.
      requestAnimationFrame(this.requestAnimationFrameHandler);
  }

  requestAnimationFrameHandler = () => {
      this.animationService.visualizationsLayout();
      this.layoutLoop();
  }

  setupAnimationDrawingLoop(): void
  {
    this.layoutLoop();
  }
  
}
