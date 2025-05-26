import {
  Component,
  effect,
  inject,
  QueryList,
  ViewChildren
} from '@angular/core';

// three libs
import { AppMenuComponent } from './components/app-menu/app-menu.component';

// generic libs
import { AnimationService } from './services/animations/animation.service';

// utility libs
import { PlatformService } from './services/utilities/platform.service';

// components
import { VizComponent } from './components/viz/viz.component';
import { AppCustomLayoutComponent } from './components/app-custom-layout/app-custom-layout.component';

@Component({
  selector: 'app-root',
  imports: [
    AppCustomLayoutComponent,
    AppMenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent
 {
  @ViewChildren('visualizationItem') visualizationItems!: QueryList<VizComponent>;

  animationService: AnimationService = inject(AnimationService);
  platformService: PlatformService = inject(PlatformService);

  constructor() {
    this.setupAnimationDrawingLoop();
    this.platformService.setEvents();
  }

  setupAnimationDrawingLoop(): void
  {
    const layoutLoop = () => {
      // note: RequestAnimationFrame is browser specific.
      requestAnimationFrame(()=> {
        this.animationService.visualizationsLayout();
        layoutLoop();
      });
    }

    layoutLoop();
  }
}
