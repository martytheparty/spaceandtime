import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { LayoutType } from '../../interfaces/layout/layout-types';

@Component({
  selector: 'app-layout-menu',
  imports: [  
    MatIconModule,
    MatMenuModule
   ],
  templateUrl: './app-layout-menu.component.html',
  styleUrl: './app-layout-menu.component.scss'
})
export class AppLayoutMenuComponent {
  layout: LayoutType = "custom";

  toggle(): LayoutType
  {
    if (this.layout === 'custom') {
      this.layout = 'tabular';
    } else if (this.layout === 'tabular') {
      this.layout = 'custom';
    }

    return this.layout;
  }
}
