import { Routes } from '@angular/router';
import { UserPage } from './user-page/user-page';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Admin } from './admin/admin';
import { AdminGuard } from './admin/admin.guard';

export const routes: Routes = [
    {
        path: '',
        component: UserPage,
    },
    {
        
        path:'login',
        component: Login

    },
    {
        path:'register',
        component:Register
    },
    {
        path:"admin",
        component:Admin,
        canActivate: [AdminGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
