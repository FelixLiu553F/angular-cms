import { Component, Input, OnInit } from '@angular/core';
import { EmployeeListModel } from '../../../../common/models/employee/employee-list.model';

@Component({
  selector: 'organizational-card',
  templateUrl: './organizational-card.component.html',
  styleUrls: ['./organizational-card.component.css']
})
export class OrganizationalCardComponent implements OnInit {

  @Input() employee?: EmployeeListModel;
  nzBodyStyle: any;
  ngStyle: any;

  constructor() { }

  ngOnInit() {
    if (this.employee?.isSelf) {
      this.ngStyle = {
        '--background': 'linear-gradient(to left, #f7ba2b 0%, #ea5358 100%)',
        'padding': '2px',
        'background': 'var(--background)',
        'width': '304px',
        'margin': '0 auto',
      };
      this.nzBodyStyle = { 'box-shadow': '0 1px 25px rgb(0 0 0 / 20%)' };
    } else {
      this.nzBodyStyle = { 'box-shadow': '0 1px 25px rgb(0 0 0 / 20%)' };
    }
  }

}
