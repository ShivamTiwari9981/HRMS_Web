import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserList } from './pages/user-list/user-list';
import { CreateUser } from './pages/create-user/create-user';
import { ViewUser } from './pages/view-user/view-user';

const routes: Routes = [
   {
    path: '',
    component: UserList
  },

  // Create User
  {
    path: 'create',
    component: CreateUser
  },

  // Edit User
  {
    path: 'edit/:id',
    component: CreateUser
  },

  // View User
  {
    path: 'view/:id',
    component: ViewUser
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
