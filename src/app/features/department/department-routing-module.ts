import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentList } from './pages/department-list/department-list';
import { DepartmentCreate } from './pages/department-create/department-create';

const routes: Routes = [
    {
    path: '',
    component: DepartmentList
  },
   {
    path: 'list',
    component: DepartmentList
  },
  {
    path: 'add',
    component: DepartmentCreate
  },
  {
  path: 'edit/:id',
  component: DepartmentCreate
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
