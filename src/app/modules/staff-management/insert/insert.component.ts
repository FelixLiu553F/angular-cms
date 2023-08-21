import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EmployeeCreateModel } from 'src/app/common/models/employee/employee-create.model';
import { EmployeeListModel } from 'src/app/common/models/employee/employee-list.model';
import { EmployeeQueryModel } from 'src/app/common/models/employee/employee-query.model';
import { PositionListModel } from 'src/app/common/models/position/position-list.model';
import { DepartmentListModel } from '../../../common/models/department/department-list.model';
import { StaffListService } from '../services/staff-list.service';

@Component({
  selector: 'staff-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {
  form!: UntypedFormGroup;
  listOfDepartment = {
    items: new Array<DepartmentListModel>(),
    isLoading: false,
    onSearch: async (isOpen: boolean) => {
      if (isOpen && !this.listOfDepartment.items.length) {
        await this.listDepartment();
      }
    }
  };
  listOfEmployee = {
    items: new Array<EmployeeListModel>(),
    isLoading: false,
    isDisabled: true,
    onSearch: async (isOpen: boolean) => {
      if (isOpen && !this.listOfEmployee.items.length) {
        await this.listEmployee();
      }
    },
    onReset: () => {
      this.listOfEmployee.items = [];
      this.listOfEmployee.isDisabled = !!!this.form.value.departmentId;
      this.form.patchValue({
        managerId: null
      });
    }
  };
  listOfPosition = {
    items: new Array<PositionListModel>(),
    isLoading: false,
    onSearch: async (isOpen: boolean) => {
      if (isOpen && !this.listOfPosition.items.length) {
        await this.listPosition();
      }
    },
  }

  constructor(
    private fb: UntypedFormBuilder,
    private readonly staffListService: StaffListService,
    private readonly message: NzMessageService,
  ) { }

  ngOnInit() {
    this.buildForm();
  };

  buildForm = () => {
    this.form = this.fb.group({
      email: [, Validators.required],
      accountName: [, Validators.required],
      chineseName: [,],
      mobile: [,],
      managerId: [, Validators.required],
      gender: [,],
      birth: [,],
      positionId: [, Validators.required],
      departmentId: [, Validators.required],
      avatar: [,],
    })
  };

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.form.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  listDepartment = async () => {
    this.listOfDepartment.isLoading = true;
    const result = await this.staffListService.findDepartmentsByFilter();
    this.listOfDepartment.items = result.items;
    this.listOfDepartment.isLoading = false;
  }

  // 权限待完善，应获取权限为leader的employees
  listEmployee = async () => {
    this.listOfEmployee.isLoading = true;
    const filter = new EmployeeQueryModel({ departmentId: this.form.value.departmentId })
    const result = await this.staffListService.findEmployeesByFilter(filter);
    this.listOfEmployee.items = result.items;
    this.listOfEmployee.isLoading = false;
  }

  listPosition = async () => {
    this.listOfPosition.isLoading = true;
    const result = await this.staffListService.findPositionsByFilter();
    this.listOfPosition.items = result.items;
    this.listOfPosition.isLoading = false;
  }

  submitForm = async () => {
    if (this.form.valid) {
      const body = new EmployeeCreateModel(this.form.value);
      const result = await this.staffListService.createEmployee(body);
      if (result) {
        this.form.reset();
        this.message.success('success');
        // TODO send email to employee
        // TODO 新增后刷新
      } else{
        this.message.error('error');
      }
    } else {
      // 表单校验-脏校验
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  };

}
