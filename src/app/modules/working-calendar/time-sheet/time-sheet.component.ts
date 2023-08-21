import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeSheetService } from '../services/time-sheet.service';

@Component({
  selector: 'calendar-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.css']
})
export class TimeSheetComponent implements OnInit {

  @Input() accessDate?: Date;
  @Output() private outer = new EventEmitter();

  constructor(
    private readonly timeSheetService: TimeSheetService,
  ) { }

  ngOnInit() {
  }

  goBack = () => {
    this.outer.emit(false);
  }

  showDate = () => {
  }



}
