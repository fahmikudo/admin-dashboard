import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ExamplesComponent } from './pages/examples/examples.component';
import { SubExamplesComponent } from './pages/examples/sub-examples/sub-examples.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'examples',
    component: ExamplesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'sub-examples',
        component: SubExamplesComponent,
      },
    ],
  },
];
