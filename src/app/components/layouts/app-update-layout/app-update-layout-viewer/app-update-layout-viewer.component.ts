import {
  inject,
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

import { AppUpdateLayoutService } from '../services/app-update-layout.service';
import { WViewPortResizeService } from '../../../../services/ui/w-view-port-resize.service';
import { VizComponent } from '../../../viz/viz.component';


@Component({
  selector: 'app-update-layout-viewer',
  imports: [
    VizComponent
  ],
  templateUrl: './app-update-layout-viewer.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app-update-layout-viewer.component.scss',
})
export class AppUpdateLayoutViewerComponent {
    // scoped to the app-update-layout
    appUpdateLayoutService: AppUpdateLayoutService = inject(AppUpdateLayoutService);
    // singleton
    wViewPortResizeService: WViewPortResizeService = inject( WViewPortResizeService);
}
