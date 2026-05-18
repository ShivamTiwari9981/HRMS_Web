import { Injectable } from '@angular/core';
import { SidebarItem } from '../models/sidebar.model';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  getMenu(): SidebarItem[] {
    return [
      {
        title: 'Dashboard',
        icon: 'dashboard',
        route: '/dashboard/home'
      },
      {
        title: 'Employees',
        icon: 'groups',
        children: [
          {
            title: 'Employee List',
            icon: 'list',
            route: '/dashboard/employees'
          },
          {
            title: 'Add Employee',
            icon: 'person_add',
            route: '/dashboard/add-employee'
          }
        ]
      },
      
      {
        title: 'Attendance',
        icon: 'calendar_month',
        route: '/dashboard/attendance'
      },
      {
        title: 'Payroll',
        icon: 'payments',
        route: '/dashboard/payroll'
      },
      {
        title: 'Settings',
        icon: 'settings',
        route: '/dashboard/settings'
      }
    ];
}}
