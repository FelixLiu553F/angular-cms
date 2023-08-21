import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApprovalComponent } from './approval/approval.component';
import { InfoComponent } from './info/info.component';
import { ListComponent } from './list/list.component';
import { RequestComponent } from './request/request.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'info', component: InfoComponent },
  { path: 'request', component: RequestComponent},
  { path: 'approval', component: ApprovalComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacationManagementRoutingModule { }
