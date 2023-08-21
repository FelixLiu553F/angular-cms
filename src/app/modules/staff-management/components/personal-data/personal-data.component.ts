import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DepartmentListModel } from '../../../../common/models/department/department-list.model';
import { EmployeeChangeModel } from '../../../../common/models/employee/employee-change.model';
import { PositionListModel } from '../../../../common/models/position/position-list.model';
import { ArrayKeyString } from '../../../../common/models/common/array-key-string.model';
import { EmployeeListModel } from '../../../../common/models/employee/employee-list.model';
import { CommonService } from '../../../../common/services/common.service';
import { StaffListService } from '../../services/staff-list.service';
import { EmployeeQueryModel } from 'src/app/common/models/employee/employee-query.model';

@Component({
  selector: 'staff-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {
  isHR = false;
  isLeader = false;
  @Input() employee?: EmployeeListModel;
  @Output() isEmployeeChange = new EventEmitter();
  form!: FormGroup;
  isChange: ArrayKeyString = {
    accountName: false,
    general: false,
    birth: false,
  }
  isEdit: ArrayKeyString = {
    accountName: false,
    chineseName: false,
    general: false,
    birth: false,
  }
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
    onSearch: async (isOpen: boolean) => {
      if (isOpen && !this.listOfEmployee.items.length) {
        await this.listEmployee();
      }
    },
    onReset: () => {
      this.listOfEmployee.items = [];
      this.employee!.manager = new EmployeeListModel();
      this.form.patchValue({
        managerId: null
      });
      this.isChange['managerId'] = true;
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
  formCopy!: ArrayKeyString;

  constructor(
    private readonly fb: FormBuilder,
    private readonly commonService: CommonService,
    private readonly staffListService: StaffListService,
    private readonly message: NzMessageService,
  ) { }

  async ngOnInit() {
    const role = sessionStorage.getItem('roles');
    this.isHR = role?.includes('HR') || false;
    this.isLeader = role?.includes('Leader') || false;
    if (!this.employee) {
      await this.loadEmployee();
    }
    this.buildForm();
    this.formCopy = this.form.value;
  }

  buildForm = () => {
    this.form = this.fb.group({
      accountName: [this.employee?.accountName],
      chineseName: [this.employee?.chineseName],
      gender: [this.employee?.gender],
      birth: [this.employee?.birth],
      avatar: [this.employee?.avatar],
      // TODO 权限验证
      isActive: [this.employee?.isActive],
      departmentId: [this.employee?.department?.id],
      // TODO 选完部门的交互待完善
      managerId: [this.employee?.manager?.id],
      positionId: [this.employee?.position?.id],
    })
  }

  listDepartment = async () => {
    this.listOfDepartment.isLoading = true;
    const result = await this.staffListService.findDepartmentsByFilter();
    this.listOfDepartment.items = result.items;
    this.listOfDepartment.isLoading = false;
  }

  listEmployee = async () => {
    this.listOfEmployee.isLoading = true;
    const filter = new EmployeeQueryModel({ departmentId: this.form.value.departmentId })
    // 权限待完善，应获取权限为leader的employees
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

  loadEmployee = async () => {
    const result = await this.commonService.getEmployee();
    this.employee = result;
  }

  onChange = (key: string) => {
    this.isChange[key] = !this.isChange[key]; 
    if(!this.isChange[key]){
      this.form.controls[key].setValue(this.formCopy[key])
    }
  }

  // TODO 选择后点击取消 会一同更改
  onSubmit = async (key: string) => {
    const body = new EmployeeChangeModel(this.form?.value);
    const result = await this.staffListService.updateEmployee(this.employee?.id!, body);
    if (result) {
      this.employee = result;
      this.onChange(key);
      this.isEmployeeChange.emit(true);
      this.message.success('保存成功！');
    }
  }
}
