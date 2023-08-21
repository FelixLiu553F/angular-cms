import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ManagementService } from '../services/management.service';
import { DepartmentListModel } from 'src/app/common/models/department/department-list.model';

@Component({
  selector: 'app-department-management',
  templateUrl: './department-management.component.html',
  styleUrls: ['./department-management.component.css']
})
export class DepartmentManagementComponent implements OnInit {
  list = {
    items: new Array<DepartmentListModel>(),
    isLoading: false,
    onSearch: async (isOpen: boolean) => {
      if (isOpen && !this.list.items.length) {
        await this.listDepart();
      }
    },
  };
  onEdit = {
    id: 0,
    name: '',
    isVisible: false,
    handleCancel: () => {
      this.onEdit.isVisible = false;
    },
    handleOk: async () => {
      await this.managementService.editDepartment(
        this.onEdit.id,
        this.onEdit.name
      );
      this.message.success('success');
      await this.listDepart();
      this.onEdit.isVisible = false;
    },
    showModal: (id: number) => {
      this.onEdit.name = '';
      this.onEdit.id = id;
      this.onEdit.isVisible = true;
    },
  };
  onInsert = {
    id: undefined,
    name: '',
    isVisible: false,
    handleCancel: () => {
      this.onInsert.isVisible = false;
    },
    handleOk: async() => {
      await this.managementService.insertDepartment(
        this.onInsert.name
      );
      this.message.success('success');
      await this.listDepart();
      this.onInsert.isVisible = false;
    },
    showModal: () => {
      this.onInsert.name = '';
      this.onInsert.isVisible = true;
    },
  };

  constructor(
    private readonly managementService: ManagementService,
    private readonly message: NzMessageService
  ) {}

  async ngOnInit() {
    await this.listDepart();
  }

  listDepart = async () => {
    this.list.isLoading = true;
    const result = await this.managementService.findDepartmentsByFilter();
    this.list.items = result.items;
    this.list.isLoading = false;
  };

  async onDelete(id:number){
    await this.managementService.deleteDepartment(id);
    this.message.success('success');
      await this.listDepart();
  }
}
