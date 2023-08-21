import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeListModel } from '../../../common/models/employee/employee-list.model';

@Component({
  selector: 'staff-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  @Output() private outer = new EventEmitter();
  @Input() employee?: EmployeeListModel;
  @Input() isChild = false;
  @Output() private isEmployeeChange = new EventEmitter();

  constructor(
    private readonly router: Router,
  ) { }

  ngOnInit() { }

  onBack = () => {
    if (this.isChild) {
      this.outer.emit(false);
      this.isChild = false;
    } else {
      this.router.navigate(['index']);
    }
  }

  employeeChange = (isChange: boolean) => {
    this.isEmployeeChange.emit(isChange);
  }
}
