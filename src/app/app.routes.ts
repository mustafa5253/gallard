import { PageComponent } from './page.component';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'indent', redirectTo: 'pages/indent', pathMatch: 'full'},
  {
    path: 'pages', component: PageComponent,
    children: [
      {path: 'indent', loadChildren: './indent/indent.module#IndentModule'},
    ]
  }
];
