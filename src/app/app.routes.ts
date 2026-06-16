import { Routes } from '@angular/router';
import {Layout} from './core/layout/layout/layout';
import {Landing} from './pages/landing/landing';
import {Login} from './pages/login/login';
import {RegisterUser} from './pages/register-user/register-user';
import {RegisterMember} from './pages/register-member/register-member';
import {authGuard} from './shared/guards/auth-guard';
import {adminGuard} from './shared/guards/admin-guard';
import {AddFile} from './pages/add-file/add-file';

export const routes: Routes = [
  {
    path: "",
    component: Layout,
    children: [
      { path: '', component: Landing },
      { path: 'login', component: Login },
      { path: 'register/user', component: RegisterUser, canActivate: [authGuard, adminGuard] },
      { path: 'register/member', component: RegisterMember, canActivate: [authGuard, adminGuard] },
      { path: 'register/add-file', component: AddFile},
    ]
  }
];
