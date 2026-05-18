import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayout } from '../../core/layouts/dashboard-layout/dashboard-layout';
import { DashboardHome } from './pages/dashboard-home/dashboard-home';

const routes: Routes = [
{

    path: 'home',
    component: DashboardHome
  },
    // path: 'dashboard',
    // component: DashboardLayout,
    // children: [
    //   {
    //     path: 'home',
    //     component: DashboardHome
    //   }
    // ]

  // {
  //   path: '',
  //   redirectTo: 'dashboard/home',
  //   pathMatch: 'full'
  // }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
