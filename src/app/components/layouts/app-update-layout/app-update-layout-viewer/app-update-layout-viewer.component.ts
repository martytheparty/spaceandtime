import { 
  inject,
  Component
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
  styleUrl: './app-update-layout-viewer.component.scss',
})
export class AppUpdateLayoutViewerComponent {
    appUpdateLayoutService: AppUpdateLayoutService = inject(AppUpdateLayoutService);
    wViewPortResizeService: WViewPortResizeService = inject( WViewPortResizeService);
}
