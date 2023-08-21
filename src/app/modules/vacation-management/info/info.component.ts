import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VacationListModel } from '../../../common/models/vacation/vacation-list.model';

@Component({
  selector: 'vacation-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  @Output() private outer = new EventEmitter();
  @Input() vacation?: VacationListModel;

  constructor() {}

  ngOnInit() {}

  onBack = () => {
    this.outer.emit(false);
  };
}
