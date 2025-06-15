import {
  Component,
  inject
} from '@angular/core';

import { RouterModule } from '@angular/router';

// three libs
import { AppMenuComponent } from './components/app-menu/app-menu.component';

// generic libs
import { AnimationService } from './services/animations/animation.service';

// utility libs
import { PlatformService } from './services/utilities/platform.service';

// components
import { AppLayoutMenuComponent } from './components/app-layout-menu/app-layout-menu.component';

@Component({
  selector: 'app-root',
  imports: [
    AppMenuComponent,
    AppLayoutMenuComponent,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent
 {
  animationService: AnimationService = inject(AnimationService);
  platformService: PlatformService = inject(PlatformService);

  layoutLoop = () => {
      // note: RequestAnimationFrame is browser specific.
      requestAnimationFrame(this.requestAnimationFrameHandler);
  }

  requestAnimationFrameHandler = () => {
      this.animationService.visualizationsLayout();
      this.layoutLoop();
  }

  constructor() {
    this.setupAnimationDrawingLoop();
    this.platformService.setEvents();
  }

  setupAnimationDrawingLoop(): void
  {
    this.layoutLoop();
  }
  
}
