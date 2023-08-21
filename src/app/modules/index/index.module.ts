import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { indexRoutingModule } from './index-routing.module';
import { PunchCardComponent } from './components/punch-card/punch-card.component';
import { IndexComponent } from './index/index.component';
import { WorkingCalendarModule } from '../working-calendar/working-calendar.module';



@NgModule({
  declarations: [
    PunchCardComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    indexRoutingModule,
    SharedModule,
    WorkingCalendarModule,
  ],
  exports:[PunchCardComponent]
})
export class IndexModule { }
