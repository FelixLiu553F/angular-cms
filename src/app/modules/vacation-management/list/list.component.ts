import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { VacationService } from '../services/vacation.service';
import { VacationListModel } from 'src/app/common/models/vacation/vacation-list.model';
import { VacationStatusStatus } from '../enums/vacation-status.enum';

@Component({
  selector: 'vacation-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  isInfo = false;
  @Input() employeeId?: number;
  pageIndex = 1;
  pageSize = 8;
  initLoading = true;
  loadingMore = false;
  data: any[] = [];
  list: Array<{ loading: boolean; data: VacationListModel }> = [];
  VacationStatusStatus = VacationStatusStatus;
  vacation?: VacationListModel
 
  constructor(
    private readonly vacationService: VacationService,
    private readonly message: NzMessageService,
  ) {}

 async  ngOnInit() {
    await this.getData();
  }

  getData = async () => {
    this.list = this.data.concat(
      [...Array(this.pageSize)].map(() => ({ loading: true, data: {} }))
    );
    const query = Object.assign(
      {
        employeeId: this.employeeId,
        maxResultCount: this.pageSize,
        skipCount: this.pageSize * (this.pageIndex - 1),
      }, {}
    );
    const result = await this.vacationService.findVacationsByFilter(query);
    this.data = result.map((item) => ({loading: false, data: item}));
    this.list = [...this.data];
    this.initLoading = false;
  };

  onLoadMore = async () => {
    this.pageIndex += 1;
    this.loadingMore = true;
    this.list = this.data.concat(
      [...Array(this.pageSize)].map(() => ({ loading: true, data: {} }))
    );
    const query = Object.assign(
      {
        employeeId: this.employeeId,
        maxResultCount: this.pageSize,
        skipCount: this.pageSize * (this.pageIndex - 1),
      }, {}
    );
    const result = await this.vacationService.findVacationsByFilter(query);
    this.data = this.data.concat(result.map((item) => ({loading: false, data: item})));
    this.list = [...this.data];
    this.loadingMore = false;
  };

  onInfo = (vacation: VacationListModel) => {
    this.isInfo = !this.isInfo;
    this.vacation = vacation;
  }

  onBack = (isInfo: boolean) => {
    this.isInfo = isInfo;
  }
}
