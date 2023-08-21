import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DepartmentListModel } from '../../../common/models/department/department-list.model';
import { EmployeeListModel } from '../../../common/models/employee/employee-list.model';
import { StaffActiveStaus } from '../enums/staff-active-status';
import { StaffListService } from '../services/staff-list.service';
import * as dayjs from 'dayjs'

@Component({
  selector: 'staff-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  listOfEmployee = {
    pageIndex: 1,
    pageSize: 10,
    items: new Array<EmployeeListModel>(),
    totalCount: 0,
    isLoading: false,
    pageIndexChange: (index: number) => {
      const query = {
        skipCount: this.listOfEmployee.pageSize * (index - 1),
      };
      this.listEmployee(query);
    },
    pageSizeChange: (size: number) => {
      const query = {
        maxResultCount: size,
      };
      this.listEmployee(query);
    },
    onSearch: () => {
      this.listOfEmployee.pageIndex = 1;
      this.listEmployee();
    },
    onExport: () => {
      this.onExport();
    }
  }

  listOfDepartment = {
    items: new Array<DepartmentListModel>(),
    isLoading: false,
    onSearch: (isOpen: boolean) => {
      if (isOpen && !this.listOfDepartment.items.length) {
        this.listDepartment();
      }
    }
  }

  insertOfEmployee = {
    isVisible: false,
    isConfirmLoading: false,
    showModal: () => {
      this.insertOfEmployee.isVisible = true;
    },
    handleCancel: () => {
      this.insertOfEmployee.isVisible = false;
    },
    handleOk: () => {
      this.insertOfEmployee.isVisible = false;
      this.message.info('添加成功');
    }
  }

  isInfo = false;
  employee?: EmployeeListModel;
  validateForm!: UntypedFormGroup;
  departments?: DepartmentListModel[];
  widthConfig = ['15%', '15%', '40%', '15%', '15%'];
  staffActiveStaus = StaffActiveStaus;
  modalBusy = false;
  isVisible = false;
  modal = '';

  constructor(
    private readonly staffListService: StaffListService,
    private readonly fb: UntypedFormBuilder,
    private readonly message: NzMessageService,
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [],
      departmentId: [],
      isActive: []
    });
    this.listEmployee();
  }

  listEmployee = async (options?: any) => {
    this.listOfEmployee.isLoading = true;
    const query = Object.assign(
      {
        userName: this.validateForm.value.userName,
        departmentId: this.validateForm.value.departmentId,
        isActive: this.validateForm.value.isActive,
        maxResultCount: this.listOfEmployee.pageSize,
        skipCount: this.listOfEmployee.pageSize * (this.listOfEmployee.pageIndex - 1),
      },
      options || {}
    );
    const result = await this.staffListService.findEmployeesByFilter(query);
    this.listOfEmployee.items = result.items;
    this.listOfEmployee.totalCount = result.totalCount;
    this.listOfEmployee.isLoading = false;
  }

  listDepartment = async () => {
    this.listOfDepartment.isLoading = true;
    const result = await this.staffListService.findDepartmentsByFilter();
    this.listOfDepartment.items = result.items;
    this.listOfDepartment.isLoading = false;
  }

  onInfo = (employee: EmployeeListModel) => {
    this.isInfo = !this.isInfo;
    this.employee = employee;
  }

  onBack = (isInfo: boolean) => {
    this.isInfo = isInfo;
  }

  onReset = () => {
    this.message.success('删除成功');
    this.validateForm.reset();
  }

  onExport = () => {
    this.modalBusy = true;
    const query =
      {
        userName: this.validateForm.value.userName,
        departmentId: this.validateForm.value.departmentId,
        isActive: this.validateForm.value.isActive,
      };
    this.staffListService.onExport(query).subscribe(data => {
      if (!data.size) {
        this.modal = '数据为空。';
        this.isVisible = true;
      } else {
        const fileName = `报表_${dayjs().format(
          'YYYYMMDDHHmmssSSS'
        )}.csv`;
        this.downLoadFile(data, fileName);
      }
      this.modalBusy = false;
    },error => {
      this.message.error(error);
      this.modalBusy = false;
    })
  }

  handleCancel(){
    this.isVisible = false;
  }

  downLoadFile(data: Blob, fileName: string) {
    const link = document.createElement('a');
    const blob = new Blob([data]);
    link.style.display = 'none';
    link.href = URL.createObjectURL(blob);
    link.setAttribute(
      'download',
      `${fileName}`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }
}
