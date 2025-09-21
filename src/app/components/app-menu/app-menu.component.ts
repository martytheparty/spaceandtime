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
  appModelService: AppModelService = inject(AppModelService);
  injector: Injector = inject(Injector);

  isOpen = false;
  reflow: ReflowType = this.appModelService.getReflow();


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
