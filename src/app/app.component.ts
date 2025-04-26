import { AfterViewInit, Component, ElementRef, inject, QueryList, ViewChildren } from '@angular/core';

// three libs
import { VizComponent } from './components/viz/viz.component';
import { RendererService } from './services/three/renderer/renderer.service';

// st libs
import { StRendererService } from './services/st/renderer/st-renderer.service';
import { StRenderer } from './interfaces/st/three/renderer/st-renderer';

// generic libs
import { AnimationService } from './services/animations/animation.service';
import { VisualizationService } from './services/visualization/visualization.service';

@Component({
  selector: 'app-root',
  imports: [
    VizComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit
 {
  @ViewChildren('visualizationItem') visualizationItems!: QueryList<VizComponent>;

  animationService: AnimationService = inject(AnimationService);
  rendererService: RendererService = inject(RendererService);
  stRendererService: StRendererService = inject(StRendererService);
  visualizationService: VisualizationService = inject(VisualizationService);

  stRendererIds: number[] = [];

  constructor() {
    this.setupAnimationDrawingLoop();

    this.createAndAnimateRenderers(4);
    this.waitCreateAndAnimateRenderers(4, 500);
    this.waitCreateAndAnimateRenderers(4, 1000);
    this.waitCreateAndAnimateRenderers(4, 1500);


    // this.animateVisualizations();

    // this code does nothing... it is for future growth
    // const stVisualization: StVisualization = {
    //   stWidth: 200,
    //   stHeight: 200,
    //   stRenderer: stRenderer01
    // };
    // this code does nothing... it is for future growth


  }

  ngAfterViewInit(): void {
   this.setupVisualizations();
  }

  createAndAnimateRenderers(count: number): void {
    // at this time browsers are limited to 16 renderers
    for(let i = 0; i < count; i++) {
      this.createRenderer();
    }

    this.animateVisualizations();
    this.setupDomVisualizations();
  }

  waitCreateAndAnimateRenderers(count: number, ms: number): void {
    setTimeout( () => { this.createAndAnimateRenderers(count); }, ms);
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
      requestAnimationFrame(()=> {
        this.animationService.visualizationsLayout();
        layoutLoop();
      });
    }

    layoutLoop();
  }

  setupVisualizations(): void {
    const vizComponents: VizComponent[] = this.visualizationItems.toArray();
    vizComponents.forEach(
      (vizComponent: VizComponent) => {
        // create a stLayout with a reference to this layout component
        if (!vizComponent.hasBeenInitialized) {
          this.visualizationService.createVisualization(vizComponent.stRendererInputId(), vizComponent);
        }

        vizComponent.setAsInitialized();
        
      }
    );
  }

  createRenderer(): void {
    const id = this.stRendererService.getBaseStRenderer();
    this.stRendererIds.push(id);
  }

  animateVisualizations(): void {
    this.stRendererIds.forEach(
      (stRendererId: number, index: number) => {
        const stRenderer: StRenderer = this.stRendererService.getRendererById(stRendererId);
        const modulus = index%4;
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

      }
    );
  }
}
