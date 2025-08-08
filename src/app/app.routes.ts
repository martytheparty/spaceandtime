import { Route, Routes } from '@angular/router';

import { AppCustomLayoutComponent } from "./components/layouts/app-custom-layout/app-custom-layout.component";
import { AppTabularLayoutComponent } from './components/layouts/app-tabular-layout/app-tabular-layout.component';
import { AppUpdateLayoutComponent } from './components/layouts/app-update-layout/app-update-layout.component';

const updateRoute: Route = {
    path: "update/:id",
    component: AppUpdateLayoutComponent
};

const customRoute: Route = {
    path: "custom",
    component: AppCustomLayoutComponent
};

const tabularRoute: Route = {
    path: "tabular",
    component: AppTabularLayoutComponent
};

const defaultRoute: Route = {
    path: "",
    component: AppCustomLayoutComponent
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
