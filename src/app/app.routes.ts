import { PageComponent } from './page.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const ROUTES: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent },
  // {path: 'indent', redirectTo: 'pages/indent', pathMatch: 'full'},
  // {
  //   path: 'pages', component: PageComponent,
  //   children: [
  //     {path: 'indent', loadChildren: './indent/indent.module#IndentModule'},
  //   ]
  // }
];
