import { Component } from '@angular/core';

import { VizComponent } from './components/viz/viz.component';

@Component({
  selector: 'app-root',
  imports: [
    VizComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {


  title = 'Space & Time';

  constructor() {
  }
}
