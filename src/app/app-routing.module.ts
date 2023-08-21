import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleBaseGuard } from './common/guards/role_base.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/index' },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
