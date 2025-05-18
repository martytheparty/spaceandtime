import {
  Component,
  effect,
  inject,
  QueryList,
  ViewChildren
} from '@angular/core';

// three libs
import { AppMenuComponent } from './components/app-menu/app-menu.component';
import { RendererService } from './services/three/renderer/renderer.service';
import { VizComponent } from './components/viz/viz.component';

// st libs
import { StRendererService } from './services/st/renderer/st-renderer.service';
import { StRenderer } from './interfaces/st/three/renderer/st-renderer';

// generic libs
import { AnimationService } from './services/animations/animation.service';
import { VisualizationService } from './services/visualization/visualization.service';

// utility libs
import { PlatformService } from './services/utilities/platform.service';

// ui lib
import { UiService } from './services/ui/ui.service';

@Component({
  selector: 'app-root',
  imports: [
    VizComponent,
    AppMenuComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent
 {
  @ViewChildren('visualizationItem') visualizationItems!: QueryList<VizComponent>;

  animationService: AnimationService = inject(AnimationService);
  rendererService: RendererService = inject(RendererService);
  stRendererService: StRendererService = inject(StRendererService);
  visualizationService: VisualizationService = inject(VisualizationService);
  platformService: PlatformService = inject(PlatformService);
  uiService: UiService = inject(UiService);

  stRendererIds: number[] = [];

  constructor() {
    this.setupAnimationDrawingLoop();
    this.platformService.setEvents();

    effect(() => {
      this.stRendererIds = this.uiService.stRendererIdsSignal();
      this.animateVisualizations();
      this.setupDomVisualizations();
    });
  }

  setupDomVisualizations(): void
  {
    // wait for angular to build dom elements
    setTimeout( () => {
      this.setupVisualizations();
    }, 0 );
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

  setupVisualizations(): void {
    const vizComponents: VizComponent[] = this.visualizationItems.toArray();

    this.setupVisualizationItems(vizComponents);
  }

  setupVisualizationItems(vizComponents: VizComponent[]): number {

    vizComponents.forEach(
      this.createVizForComponent.bind(this)
    );

    return vizComponents.length;
  }

  createVizForComponent(vizComponent: VizComponent): boolean {
        // create a stLayout with a reference to this layout component
        if (!vizComponent.isInitialized()) {
          this.visualizationService.createVisualization(vizComponent.stRendererInputId(), vizComponent);
        }

        return vizComponent.setAsInitialized();
  }

  animateVisualizations(): void {
    this.stRendererIds.forEach(this.animatateVisualization.bind(this));
  }

  animatateVisualization(stRendererId: number, index: number): boolean {
    const modulus = index%4;
    this.animateMesh(stRendererId, modulus);
    return true;
  }

  animateMesh(stRendererId: number, modulus: number): boolean {
      const stRenderer: StRenderer = this.stRendererService.getRendererById(stRendererId);

      if (modulus === 0) {
        const mesh = stRenderer.stScene.stMeshes[0];
        this.animationService
          .addAnimation(
            mesh,
            'mesh-rotation-x',
            'infinite',
            'continous',
            0,
            [.05]);
      } else if(modulus === 1) {
        const mesh = stRenderer.stScene.stMeshes[0];
        this.animationService
          .addAnimation(
            mesh,
            'mesh-rotation-y',
            'infinite',
            'continous',
            0,
            [.05]);
      } else if(modulus === 2) {
        const mesh = stRenderer.stScene.stMeshes[0];
        this.animationService
          .addAnimation(
            mesh,
            'mesh-rotation-z',
            'infinite',
            'continous',
            0,
            [.05]);
      } else if(modulus === 3) {
        const mesh = stRenderer.stScene.stMeshes[0];
        this.animationService
          .addAnimation(
            mesh,
            'mesh-rotation-x',
            'infinite',
            'continous',
            0,
            [.05]);

          this.animationService
            .addAnimation(
              mesh,
              'mesh-rotation-y',
              'infinite',
              'continous',
              0,
              [.05]);

          this.animationService
            .addAnimation(
              mesh,
              'mesh-rotation-z',
              'infinite',
              'continous',
              0,
              [.05]);
      }

      return true;
    }
}
