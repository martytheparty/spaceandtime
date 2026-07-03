import { 
  inject,
  Component
} from '@angular/core';

import { AppUpdateLayoutService } from '../services/app-update-layout.service';
import { StPublisherService } from '../../../../services/entities/st/publish/st-publisher.service';
import { ThreePublisherService } from '../../../../services/entities/three/attribute-publish/three-publisher.service';

@Component({
  selector: 'app-update-layout-editor',
  imports: [],
  templateUrl: './app-update-layout-editor.component.html',
  styleUrl: './app-update-layout-editor.component.scss',
})
export class AppUpdateLayoutEditorComponent {
  appUpdateLayoutService: AppUpdateLayoutService = inject(AppUpdateLayoutService);
  stPublisherService: StPublisherService = inject(StPublisherService);
  threePublisherService: ThreePublisherService = inject(ThreePublisherService);
}
