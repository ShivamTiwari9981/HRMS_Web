import { Routes } from '@angular/router';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { MainLayout } from './layout/main-layout/main-layout';

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
//   {
//     path: '',
//     component: MainLayout,   // layout with navbar/sidebar/footer
//     children: [
//        { path: '', redirectTo: 'home', pathMatch: 'full' } // default route
//     ],
//   },
  { path: '**', redirectTo: 'login' }

];
