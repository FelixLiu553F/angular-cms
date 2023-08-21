import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TaskService } from '../services/task.service';
import { CommonService } from '../../../common/services/common.service';
import { EmployeeListModel } from 'src/app/common/models/employee/employee-list.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;
  employees: EmployeeListModel[] = [];
  isLoading = false;

  constructor(
    private fb: UntypedFormBuilder,
    private readonly message: NzMessageService,
    private readonly router: Router,
    private readonly commonService: CommonService,
    private readonly taskService: TaskService
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [, [Validators.required]],
      startDate: [, [Validators.required]],
      endDate: [, [Validators.required]],
      content: [, [Validators.required]],
      assigneeId: [, [Validators.required]],
    });
  }

  async onSearch() {
    const employeeInfo = await this.commonService.getEmployee();
    this.employees = (
      await this.taskService.findEmployeesByFilter({
        departmentId: employeeInfo.department?.id,
      })
    ).items;
  }

  disabledStartDate = (startDate: Date): boolean => {
    if (!startDate || !this.validateForm.value.endDate) {
      return false;
    }
    return startDate.getTime() > this.validateForm.value.endDate.getTime();
  };

  disabledEndDate = (endDate: Date): boolean => {
    if (!endDate || !this.validateForm.value.startDate) {
      return false;
    }
    return endDate.getTime() <= this.validateForm.value.startDate.getTime();
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
  }

  handleEndOpenChange(open: boolean): void {}

  resetForm() {
    this.validateForm.reset();
  }

  async submitForm() {
    if (!this.validateForm.valid) {
      this.message.error('请填写完整信息');
      return;
    }
    const result = await this.taskService.createTask(this.validateForm.value);
    if (result) {
      this.message.success('success');
    } else {
      this.message.error('error');
    }
  }
}
