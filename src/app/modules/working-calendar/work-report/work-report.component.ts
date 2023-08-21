import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonService } from 'src/app/common/services/common.service';
import { TaskService } from '../services/task.service';
import { TaskListModel } from 'src/app/common/models/task/task-list.model';

@Component({
  selector: 'app-work-report',
  templateUrl: './work-report.component.html',
  styleUrls: ['./work-report.component.css'],
})
export class WorkReportComponent implements OnInit {
  tasks: TaskListModel[] = [];
  loading = true;
  isVisible = false;
  isConfirmLoading = false;
  content = '';

  constructor(
    private fb: UntypedFormBuilder,
    private readonly message: NzMessageService,
    private readonly router: Router,
    private readonly commonService: CommonService,
    private readonly taskService: TaskService
  ) {}

  async ngOnInit() {
    await this.getTaskByAssigneeId();
  }

  async getTaskByAssigneeId() {
    this.tasks = await this.taskService.getTaskByAssigneeId();
    this.loading = false;
    console.log('sss');
  }

  async onEdit() {
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
  }
  handleOk(isFinish: boolean) {}
}
