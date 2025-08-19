import { Routes } from '@angular/router';
import { Dashboard } from './components/home/dashboard/dashboard';
import { CardTrash } from './components/templates/card-trash/card-trash';
import { Login } from './components/public/login/login';
import { Register } from './components/public/register/register';

export const routes: Routes = [
    { path:"", redirectTo:"dashboard", pathMatch: "full"},
    { path:"dashboard", component:Dashboard},
    { path:"trash", component: CardTrash},
    { path:"login", component: Login},
    { path:"register", component:Register},
    { path:"**", redirectTo: "error-404", pathMatch: "full"}

];
