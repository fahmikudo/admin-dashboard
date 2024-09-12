import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ExamplesComponent } from './pages/examples/examples.component';
import { SubExamplesComponent } from './pages/examples/sub-examples/sub-examples.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'examples',
    component: ExamplesComponent,
    children: [
      {
        path: 'sub-examples',
        component: SubExamplesComponent,
      },
    ],
  },
];
