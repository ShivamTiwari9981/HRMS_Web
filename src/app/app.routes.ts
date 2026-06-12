import { Routes } from '@angular/router';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { DashboardLayout } from './core/layouts/dashboard-layout/dashboard-layout';
import { OnboardingLayout } from './core/layouts/onboarding-layout/onboarding-layout';
import { authGuard } from './core/guards/auth-guard';
import { dashboardGuard } from './core/guards/dashboard-guard';
import { onboardingGuard } from './core/guards/onboarding-guard';


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

  // ================= ONBOARDING LAYOUT =================
  {
    path: 'company-setup',
    component: OnboardingLayout,
    canActivate: [authGuard, onboardingGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/onboarding/onboarding-module')
            .then(m => m.OnboardingModule)
      }
    ]
  },

    {
    path: '',
    component: DashboardLayout,
    canActivate: [authGuard,dashboardGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard-module')
            .then(m => m.DashboardModule)
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./features/user-management/users/users-module')
            .then(m => m.UsersModule)
      },

      {
        path: 'employee',
        loadChildren: () =>
          import('./features/employee/employee-module')
            .then(m => m.EmployeeModule)
      },
      {
        path: 'departments',
        loadChildren: () =>
          import('./features/department/department-module')
            .then(m => m.DepartmentModule)
      },

      {
        path: 'assistent',
        loadChildren: () =>
          import('./ai-assistant/ai-assistant-module')
            .then(m => m.AiAssistantModule)
      },
    ]
  },

   // ================= DEFAULT =================
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // ================= NOT FOUND =================
  {
    path: '**',
    redirectTo: 'login'
  }

];
