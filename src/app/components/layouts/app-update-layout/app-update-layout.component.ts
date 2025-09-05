import {
  AfterViewInit,
  Component,
  ElementRef,
  effect,
  inject,
  OnInit,
  ViewChild
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { VizComponent } from '../../viz/viz.component';
import { StRenderer } from '../../../interfaces/st';
import { StRendererService } from '../../../services/st/renderer/st-renderer.service';
import { StPublisherService } from '../../../services/st/publish/st-publisher.service';
import { ThreePublisherService } from '../../../services/three/publish/three-publisher.service';

@Component({
  selector: 'app-app-update-layout',
  imports: [
    VizComponent
  ],
  templateUrl: './app-update-layout.component.html',
  styleUrl: './app-update-layout.component.scss'
})
export class AppUpdateLayoutComponent implements AfterViewInit, OnInit {

  @ViewChild('viewer') editorView : ElementRef | undefined;

  route: ActivatedRoute = inject(ActivatedRoute);
  stRendererService: StRendererService = inject(StRendererService);
  stPublisherService: StPublisherService = inject(StPublisherService);
  threePublisherService: ThreePublisherService = inject(ThreePublisherService);

  id: number = 0;
  viewerWidth = 0;
  viewerHeight = 0;
  afterInitComplete = false;
  calculatedAspectRatio = 0;

  constructor() {
    effect(() => {
      const ar = this.stPublisherService.calculatedAspectRatioSignal()[this.id];

      this.setCalculatedAspectRation(ar);

    });
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngAfterViewInit(): void {
    if (this.editorView?.nativeElement) {
      this.viewerWidth = this.editorView.nativeElement.offsetWidth;
      this.viewerHeight = this.editorView.nativeElement.offsetHeight;
      setTimeout( 
        this.finalizeInitialization.bind(this)
      , 0 );
    }
  }

  setCalculatedAspectRation(ar: number | undefined): number | undefined {
    if (ar) {
      this.calculatedAspectRatio = ar;
    }
    return ar;
  }

  finalizeInitialization(): boolean {
    let updated = true;
    const stRenderer: StRenderer = this.stRendererService.getRendererById(this.id);

    this.afterInitComplete = true;
    return updated;
  }



}
