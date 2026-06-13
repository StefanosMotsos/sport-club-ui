import { Routes } from '@angular/router';
import {Layout} from './core/layout/layout/layout';
import {Landing} from './pages/landing/landing';
import {Login} from './pages/login/login';

export const routes: Routes = [
  {
    path: "",
    component: Layout,
    children: [
      { path: '', component: Landing },
      { path: 'login', component: Login },
    ]
  }
];
