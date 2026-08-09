import {
  Component,
  ElementRef,
  effect,
  inject,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';

import { CurrentRouteService } from '../../../services/utilities/routing/current-route.service';
import { WViewPortResizeService } from '../../../services/ui/w-view-port-resize.service';
import { AppUpdateLayoutService } from './services/app-update-layout.service';
import { AppUpdateLayoutEditorComponent } from './app-update-layout-editor/app-update-layout-editor.component';
import { AppUpdateLayoutToolbarComponent } from "./app-update-layout-toolbar/app-update-layout-toolbar.component";
import { AppUpdateLayoutViewerComponent } from './app-update-layout-viewer/app-update-layout-viewer.component';

@Component({
  selector: 'app-update-layout',
  providers: [
    AppUpdateLayoutService
  ],
  imports: [
    AppUpdateLayoutEditorComponent,
    AppUpdateLayoutToolbarComponent,
    AppUpdateLayoutEditorComponent,
    AppUpdateLayoutViewerComponent
  ],
  templateUrl: './app-update-layout.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app-update-layout.component.scss'
})
export class AppUpdateLayoutComponent {
  @ViewChild('viewer') viewerView: ElementRef | undefined;
  currentRouteService: CurrentRouteService = inject(CurrentRouteService);
  wViewPortResizeService: WViewPortResizeService = inject( WViewPortResizeService);
  appUpdateLayoutService: AppUpdateLayoutService = inject(AppUpdateLayoutService);

  constructor() {
    effect(() => {
      // 📞 listening for route changes
      this.currentRouteService.currentRoute();
      // 📞 listening for screen size changes
      this.wViewPortResizeService.viewport();
      this.processVisualization(this);
    });
  }

  processVisualization(appLayoutComponent: AppUpdateLayoutComponent): boolean {
    const isStRendererCreated = this.isStRendererCreated();
    const editorDomElementExists = this.doesEditorViewDomElementExist(appLayoutComponent);
    const wasUpdated = this.updateStVisualizationSize(appLayoutComponent, isStRendererCreated, editorDomElementExists);

    return wasUpdated;
  }

  updateStVisualizationSize(
    appLayoutComponent: AppUpdateLayoutComponent,
    isStRendererCreated: boolean,
    editorDomElementExists: boolean
  ): boolean {
    let updated = false;
    if (isStRendererCreated && editorDomElementExists) {
          const viewerView: ElementRef<HTMLDivElement> = appLayoutComponent.viewerView as unknown as ElementRef<HTMLDivElement>;
          const nativeElement: HTMLDivElement = viewerView.nativeElement as unknown as HTMLDivElement;
          this.appUpdateLayoutService.publishVisualizationDimensions(nativeElement);
          updated = true;
    }
    return updated;
  }

  doesEditorViewDomElementExist(appLayoutComponent: AppUpdateLayoutComponent): boolean {
    let exists = false;

    if(appLayoutComponent.viewerView?.nativeElement) {
      exists = true;
    }

    return exists;
  }

  isStRendererCreated(): boolean {
    let created = false;

    if (this.appUpdateLayoutService.editRenderId() > 0) {
      created = true;
    }

    return created;
  }
}
