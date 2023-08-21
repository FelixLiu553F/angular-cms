import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimeSheetComponent } from './time-sheet/time-sheet.component';
import { WorkingCalendarComponent } from './working-calendat/working-calendar.component';
import { WorkingCalendarRoutingModule } from './working-calendar-routing.module';
import { TaskComponent } from './task/task.component';
import { WorkReportComponent } from './work-report/work-report.component';
import { CommonUiModule } from 'src/app/common-ui/common-ui.module';

@NgModule({
  declarations: [
    WorkingCalendarComponent,
    TimeSheetComponent,
    TaskComponent,
    WorkReportComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    WorkingCalendarRoutingModule,
    CommonUiModule,
  ],
  exports: [WorkReportComponent],
})
export class WorkingCalendarModule {}
