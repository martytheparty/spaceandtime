import { Component } from '@angular/core';

import { Route, Routes } from '@angular/router';

@Component({
  template: '' // nothing gets rendered
})
export class DummyComponent {}


const updateRoute: Route = {
    path: "update/:id",
    component: DummyComponent
};

const customRoute: Route = {
    path: "custom",
    component: DummyComponent
};

const tabularRoute: Route = {
    path: "tabular",
    component: DummyComponent
};

const defaultRoute: Route = {
    path: "",
    component: DummyComponent
};

const wildcardRoute: Route = {
    path: "**",
    redirectTo: '',
    pathMatch: 'full' 
}



export const routes: Routes = [];

routes.push(updateRoute);
routes.push(customRoute);
routes.push(tabularRoute);
routes.push(defaultRoute);
routes.push(wildcardRoute);
