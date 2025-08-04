import { 
  AfterViewInit,
  Component,
  inject,
  ViewChild
} from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

import { UiService } from '../../services/ui/ui.service';
import { AppModelService } from '../../services/appmodel/appmodel.service';
import { ReflowType } from '../../interfaces/layout/reflow-types';


@Component({
  selector: 'app-menu',
  imports: [  
    MatIconModule,
    MatMenuModule
   ],
  templateUrl: './app-menu.component.html',
  styleUrl: './app-menu.component.scss'
})
export class AppMenuComponent implements AfterViewInit 
{
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  uiService: UiService = inject(UiService);
  appModelService: AppModelService = inject(AppModelService);

  isOpen = false;
  reflow: ReflowType = this.appModelService.getReflow();


  ngAfterViewInit() {
    this.menuTrigger.menuClosed.subscribe(this.closeHandler.bind(this));
  }

  closeHandler(): boolean {
    this.isOpen = false;

    return this.isOpen;
  }

  showMenu(event: Event, trigger: MatMenuTrigger): boolean
  {
    this.isOpen = true;

    return this.isOpen;
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
