import { Routes } from '@angular/router';
import { Dashboard } from './components/home/dashboard/dashboard';
import { CardTrash } from './components/templates/card-trash/card-trash';
import { Register } from './components/public/register/register';
import { Login } from './components/public/login/login';

export const routes: Routes = [
    { path:"", redirectTo:"dashboard", pathMatch: "full"},
    { path: "dashboard", component:Dashboard},
    { path: "trash", component: CardTrash},
    { path: "register", component:Register},
    { path: "login", component:Login},
    { path: "**", redirectTo: "error-404", pathMatch: "full"}

];
