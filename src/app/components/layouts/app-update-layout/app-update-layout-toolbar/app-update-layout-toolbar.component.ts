import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-update-layout-toolbar',
  imports: [
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './app-update-layout-toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app-update-layout-toolbar.component.scss',
})
export class AppUpdateLayoutToolbarComponent {

}
