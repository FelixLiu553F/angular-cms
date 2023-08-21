import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../services/management.service';
import { VacationTypeListModel } from 'src/app/common/models/vacation/vacation-type-list.model';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-vacation-management',
  templateUrl: './vacation-management.component.html',
  styleUrls: ['./vacation-management.component.css'],
})
export class VacationManagementComponent implements OnInit {
  listOfVacationType = {
    items: new Array<VacationTypeListModel>(),
    isLoading: false,
    onSearch: async (isOpen: boolean) => {
      if (isOpen && !this.listOfVacationType.items.length) {
        await this.listVacationType();
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
      await this.managementService.editVacation(
        this.onEdit.id,
        this.onEdit.name
      );
      this.message.success('success');
      await this.listVacationType();
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
      this.onEdit.isVisible = false;
    },
    handleOk: async() => {
      await this.managementService.insertVacation(
        this.onEdit.name
      );
      this.message.success('success');
      await this.listVacationType();
    },
    showModal: () => {
      this.onEdit.name = '';
      this.onEdit.isVisible = true;
    },
  };

  constructor(
    private readonly managementService: ManagementService,
    private readonly message: NzMessageService
  ) {}

  async ngOnInit() {
    await this.listVacationType();
  }

  listVacationType = async () => {
    this.listOfVacationType.isLoading = true;
    const result = await this.managementService.findVacationTypes();
    this.listOfVacationType.items = result;
    this.listOfVacationType.isLoading = false;
  };

  async onDelete(id:number){
    await this.managementService.deleteVacation(id);
    this.message.success('success');
      await this.listVacationType();
  }
}
