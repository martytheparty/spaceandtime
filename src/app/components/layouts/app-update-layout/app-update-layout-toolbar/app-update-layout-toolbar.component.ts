import {
  inject,
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppUpdateLayoutService } from '../services/app-update-layout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-layout-toolbar',
  imports: [
    MatIconModule,
    MatTooltipModule,
    CommonModule
  ],
  templateUrl: './app-update-layout-toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app-update-layout-toolbar.component.scss',
})
export class AppUpdateLayoutToolbarComponent {
  appUpdateLayoutService: AppUpdateLayoutService = inject(AppUpdateLayoutService);

  incrementZoom(): number {
    let zoomValue = this.appUpdateLayoutService.zoomValueSignal() + 10;

    return this.changeZoom(zoomValue);
  }

  decrementZoom(): number {
    let zoomValue = this.appUpdateLayoutService.zoomValueSignal() - 10;

    return this.changeZoom(zoomValue);
  }

  changeZoom(newValue: number): number {
    this.appUpdateLayoutService.changeZoomValue(newValue);

    return this.appUpdateLayoutService.zoomValueSignal();
  }
}
