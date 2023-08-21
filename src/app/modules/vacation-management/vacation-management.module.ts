import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { InfoComponent } from './info/info.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestComponent } from './request/request.component';
import { ApprovalComponent } from './approval/approval.component';
import { VacationManagementRoutingModule } from './vacation-management-routing.module';
import { StepsComponent } from './components/steps/steps.component';



@NgModule({
  declarations: [
    ListComponent,
    InfoComponent,
    RequestComponent,
    ApprovalComponent,
    StepsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    VacationManagementRoutingModule,
  ],
  exports: [
    ListComponent,
  ]
})
export class VacationManagementModule { }
