import { Component, inject, OnDestroy } from '@angular/core';

import { Router, NavigationEnd, Event as RouterEventTypes, RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { LayoutType } from '../../interfaces/layout/layout-types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout-menu',
  imports: [  
    MatIconModule,
    MatMenuModule,
    RouterModule
   ],
  templateUrl: './app-layout-menu.component.html',
  styleUrl: './app-layout-menu.component.scss'
})
export class AppLayoutMenuComponent implements OnDestroy {

  router: Router = inject(Router);
  
  layout: LayoutType = "custom";

  routerSubscription: Subscription;

  constructor() {
    this.routerSubscription = this.router
                                  .events
                                  .subscribe(
                                    this.handleRouterEvents.bind(this)
                                  );
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  handleRouterEvents(event: RouterEventTypes): boolean {
      if (event instanceof NavigationEnd) {
        this.setLayout(event.urlAfterRedirects);
      }

      return true;
  }

  setLayout(url: string) {
    this.layout = 'custom';

    if (url.includes('custom')) {
        this.layout = 'custom';
    } else if (url.includes('tabular')) {
        this.layout = 'tabular';
    }
  }
}
