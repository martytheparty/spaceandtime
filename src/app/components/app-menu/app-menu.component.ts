import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  Injector,
  runInInjectionContext,
  ViewChild
} from '@angular/core';

import { MatIconModule } from '@angular/material/icon';

import { UiService } from '../../services/ui/ui.service';
import { AppModelService } from '../../services/appmodel/appmodel.service';
import { ReflowType } from '../../interfaces/layout/reflow-types';
import { CommonModule } from '@angular/common';
import { AnimationService } from '../../services/entities/animations/animation.service';
import { StAnimation, StMesh, StRenderer, StScene } from '../../interfaces/st';
import { StRendererService } from '../../services/entities/st/renderer/st-renderer.service';
import { StSceneService } from '../../services/entities/st/scene/st-scene.service';
import { StMeshService } from '../../services/entities/st/mesh/st-mesh.service';


@Component({
  selector: 'app-menu',
  imports: [
    MatIconModule,
    CommonModule
],
  templateUrl: './app-menu.component.html',
  styleUrl: './app-menu.component.scss'
})
export class AppMenuComponent 
{
  @ViewChild('addMenu') addMenuButton!: ElementRef<HTMLDivElement>;

  uiService: UiService = inject(UiService);
  stRendererService: StRendererService = inject(StRendererService);
  stSceneService: StSceneService = inject(StSceneService);
  stMeshService : StMeshService = inject(StMeshService);
  appModelService: AppModelService = inject(AppModelService);
  injector: Injector = inject(Injector);
  animationService: AnimationService = inject(AnimationService);

  isOpen = false;
  reflow: ReflowType = this.appModelService.getReflow();
  addCount = 0;


  closeHandler(): boolean {
    this.isOpen = false;

    return this.isOpen;
  }

  showMenu(): boolean
  {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {

      runInInjectionContext(
        this.injector, 
        this.menuAfterNextRender.bind(this)
      );


    }

    return this.isOpen;
  }

  menuAfterNextRender(): boolean
  {
    afterNextRender(this.setMenuFocus.bind(this));
    return true;
  }

  setMenuFocus(): boolean
  {
    this.addMenuButton?.nativeElement.focus();
    return true;
  }

  addVisualization(): number
  {
    const stId = this.uiService.addRenderer();
    // add default animation to the renderer

    // step 1 create an st animation
    const animation: StAnimation = this.animationService.createAnimationForCount(this.addCount++);

    // const animation = this.a
    // step 2 get the Mesh

    const stRenderer: StRenderer = this.stRendererService.getRendererById(stId);
    
    const stScene: StScene = this.stSceneService.getSceneById(stRenderer.stSceneId);

    // assumes that there is only one mesh that should be automatically animated

    const stMeshId = stScene.stMeshIds[0];
    const stMesh: StMesh = this.stMeshService.getMeshById(stMeshId);

    // step 3 add the animation to the Mesh

    stMesh.stAnimationIds.push(animation.stAnimationId);
    return stId;
  }
 
  addClickVizHandler(event: Event): number
  {
    event.preventDefault();
    event.stopPropagation();

    return this.addVisualization();
  }

  toggleReflow(reflow: ReflowType): ReflowType {

    if(reflow === 'never') {
      this.appModelService.setReflow('always');
    } else {
      this.appModelService.setReflow('never');
    }
    this.reflow = this.appModelService.getReflow();

    return this.reflow;
  }
}
