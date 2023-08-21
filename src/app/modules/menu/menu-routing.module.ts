import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleBaseGuard } from 'src/app/common/guards/role_base.guard';
import { MenuComponent } from './menu.component';
import { VacationManagementComponent } from '../login/vacation-management/vacation-management.component';
import { DepartmentManagementComponent } from '../login/department-management/department-management.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: 'index',
        loadChildren: () =>
          import('../index/index.module').then((m) => m.IndexModule),
      },
      {
        path: 'staff',
        loadChildren: () =>
          import('../staff-management/staff-management.module').then(
            (m) => m.StaffManagementModule
          ),
      },
      {
        path: 'vacation',
        loadChildren: () =>
          import('../vacation-management/vacation-management.module').then(
            (m) => m.VacationManagementModule
          ),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('../working-calendar/working-calendar.module').then(
            (m) => m.WorkingCalendarModule
          ),
      },
      { path: 'vacation/management', component: VacationManagementComponent },
      {
        path: 'department/management',
        component: DepartmentManagementComponent,
      },
    ],
    canActivate: [RoleBaseGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
