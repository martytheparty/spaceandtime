import { 
  AfterViewInit,
  Component,
  inject,
  ViewChild
} from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

import { UiService } from '../../services/ui/ui.service';


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

  isOpen = false;

  uiService: UiService = inject(UiService);

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
    const stId = this.uiService.addViz();
    return stId;
  }
 
  addClickVizHandler(event: Event): number
  {
    event.preventDefault();
    event.stopPropagation();

    return this.addVisualization();
  }
}
