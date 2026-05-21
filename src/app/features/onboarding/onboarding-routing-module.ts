import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComapnySetup } from './pages/comapny-setup/comapny-setup';

const routes: Routes = [
 {
    path: 'setup',
    component: ComapnySetup
  },

  {
    path: '',
    redirectTo: 'setup',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
