import { Routes } from '@angular/router';
import { Dashboard } from './components/home/dashboard/dashboard';
import { CardTrash } from './components/templates/card-trash/card-trash';

export const routes: Routes = [
    { path:"", redirectTo:"dashboard", pathMatch: "full"},
    { path:"dashboard", component:Dashboard},
    { path: "trash", component: CardTrash},
    { path: "**", redirectTo: "error-404", pathMatch: "full"}

];
