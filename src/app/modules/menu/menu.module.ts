import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorkingCalendarModule } from '../working-calendar/working-calendar.module';
import { StaffManagementModule } from '../staff-management/staff-management.module';
import { AvatarUrlPipe } from '../../common/pipes/avatar-url.pipe';
import { CommonUiModule } from 'src/app/common-ui/common-ui.module';
import { VacationManagementModule } from '../vacation-management/vacation-management.module';
import { IndexModule } from '../index/index.module';

const pipes = [
  AvatarUrlPipe,
]

@NgModule({
  declarations: [
    MenuComponent,
    AvatarUrlPipe,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    SharedModule,
    WorkingCalendarModule,
    StaffManagementModule,
    VacationManagementModule,
    CommonUiModule,
    IndexModule,
  ],
  exports: [
    MenuComponent,
  ]
})
export class MenuModule { }
