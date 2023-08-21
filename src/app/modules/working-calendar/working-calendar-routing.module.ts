import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkingCalendarComponent } from './working-calendat/working-calendar.component';
import { TimeSheetComponent } from './time-sheet/time-sheet.component';
import { TaskComponent } from './task/task.component';
import { WorkReportComponent } from './work-report/work-report.component';

const routes: Routes = [
  { path: 'working', component: WorkingCalendarComponent },
  { path: 'time', component: TimeSheetComponent },
  { path: 'task', component: TaskComponent },
  { path: 'work-report', component: WorkReportComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkingCalendarRoutingModule { }
