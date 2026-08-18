import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpList } from './pages/emp-list/emp-list';
import { EmpCreate } from './pages/emp-create/emp-create';

const routes: Routes = [
  {
      path:'',
      component:EmpList,
      data: { breadcrumb: 'Employee List' }
    },
  
    {
      path:'list',
      component:EmpList,
      data: { breadcrumb: 'Employee/Employee List' }
    },
  
    {
      path:'add',
      component:EmpCreate,
      data: { breadcrumb: 'Employee/Add Employee' }
    },
    {
      path:'edit/:id',
      component:EmpCreate,
      data: { breadcrumb: 'Employee/Edit Employee' }
    },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
