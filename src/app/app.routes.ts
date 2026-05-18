import { Routes } from '@angular/router';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { DashboardLayout } from './core/layouts/dashboard-layout/dashboard-layout';


export const routes: Routes = [
    {
    path: '',
    component: AuthLayout,   // layout without navbar/sidebar/footer
    children: [
      {
        path:'',loadChildren:()=>import('./features/auth/auth-module').then(m=>m.AuthModule),
      }
    ]
  },

   {
    path: 'dashboard',
    component: DashboardLayout,   // layout without navbar/sidebar/footer
    // canActivate: [authGuard, companyProfileGuard],
    children: [
      {
        path:'',loadChildren:()=>import('./features/dashboard/dashboard-module').then(m=>m.DashboardModule),
      }
    ]
  },

  
  { path: '**', redirectTo: 'login' }

];
