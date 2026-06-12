import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpList } from './pages/emp-list/emp-list';
import { EmpCreate } from './pages/emp-create/emp-create';

const routes: Routes = [
  {
      path:'',
      component:EmpList
    },
  
    {
      path:'list',
      component:EmpList
    },
  
    {
      path:'add',
      component:EmpCreate
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
