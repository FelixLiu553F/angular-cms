import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-working-calendar',
  templateUrl: './working-calendar.component.html',
  styleUrls: ['./working-calendar.component.css']
})
export class WorkingCalendarComponent implements OnInit {

  listDataMap = [
    {
      number:18,
      data: [
        { type: 'warning', content: '分析市场趋势' },
      ]
    },
  ];
  isTimeSheet = false;
  accessDate?: Date;
  optionDate = new Date();

  constructor(
    private readonly router: Router,
  ) { }

  ngOnInit() {
  }

  getMonthData = (date: Date) => {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }

  selectChange = (accessDate: Date) => {
    this.accessDate = accessDate;
    if(accessDate.getMonth() == this.optionDate.getMonth()) {
      this.isTimeSheet = true;
    }
    this.optionDate = accessDate;
  }

  goBack = (isTimeSheet: boolean) => {
    this.optionDate = new Date();
    this.isTimeSheet = isTimeSheet;
  }
}
