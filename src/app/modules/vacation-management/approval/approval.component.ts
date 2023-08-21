import { Component, OnInit } from '@angular/core';
import { VacationService } from '../services/vacation.service';
import { VacationListModel } from 'src/app/common/models/vacation/vacation-list.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css'],
})
export class ApprovalComponent implements OnInit {
  list?: VacationListModel[];
  initLoading = true; // bug
  loadingMore = false;

  constructor(
    private readonly vacationService: VacationService,
    private readonly message: NzMessageService
  ) {}

  async ngOnInit() {
    await this.initApproval();
    this.initLoading = false;
  }

  async initApproval() {
    this.initLoading = true;
    this.list = await this.vacationService.getApproval();
    this.initLoading = false;
  }

  async onApprove(id: number) {
    const result = await this.vacationService.onApprove(id);
    if (result) {
      this.message.success('success');
      await this.initApproval();
    } else {
      this.message.error('error');
    }
  }

  async onReject(id: number) {
    const result = await this.vacationService.onReject(id);
    if (result) {
      this.message.success('success');
      await this.initApproval();
    } else {
      this.message.error('error');
    }
  }
}
