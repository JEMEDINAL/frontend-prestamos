import { Routes } from '@angular/router';
import { UserPage } from './user-page/user-page';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';

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
        path: '**',
        redirectTo: ''
    }
];
