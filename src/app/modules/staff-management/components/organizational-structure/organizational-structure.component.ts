import { Component, Input, OnInit } from '@angular/core';
import { EmployeeListModel } from '../../../../common/models/employee/employee-list.model';
import { OrganizationalStructureTreeModel } from '../../models/organizational-structure-tree.model';
import { StaffListService } from '../../services/staff-list.service';

@Component({
  selector: 'staff-organizational-structure',
  templateUrl: './organizational-structure.component.html',
  styleUrls: ['./organizational-structure.component.css']
})
export class OrganizationalStructureComponent implements OnInit {

  @Input() employee!: EmployeeListModel;
  treeOfData = new OrganizationalStructureTreeModel();
  isShow = false;
  arrayOfData = new Array();

  constructor(
    private readonly staffListService: StaffListService,
  ) { }

  async ngOnInit() {
    //TODO 根据最大级别的departmId去获取
    // const result = await this.staffListService.getEmployeeForDepartment(this.employee.department.id);
    // this.listToArray(result.employees, this.employee.id);
    this.arrayOfData = await this.staffListService.getOrganization(this.employee?.id!);
    this.arrayToTree(this.arrayOfData,this.treeOfData);
    this.isShow = true;
  }

  //TODO类型不能用any
  arrayToTree = (arr: any[], tree: any) => {
    if (arr.length) {
      tree.item = arr[0];
      if (arr.length > 1) {
        const children = new OrganizationalStructureTreeModel();
        children.item = arr[1];
        tree.children = children;
        arr.shift();
        this.arrayToTree(arr, tree.children);
      }
    }
  }

  listToArray(list: EmployeeListModel[], employeeId?: number) {
    if (employeeId) {
      const employee = list.find((item) =>
        item.id == employeeId
      );
      if (employee) {
        if (employeeId == this.employee.id) {
          employee.isSelf = true;
        }
        this.arrayOfData.unshift([employee]);
      }
      this.listToArray(list, employee?.manager?.id);
    } else {
      const employees = list.filter((item) =>
        item.manager?.id == this.employee.id
      )
      this.arrayOfData.push(employees);
    }
  }

  listToTree = (list: EmployeeListModel[]) => {
    // * 先生成parent建立父子关系
    const obj = new Array();
    list.forEach((item) => {
      obj[item.id!] = item;
    });
    const parentList: any[] = [];
    list.forEach((item) => {
      const parent = obj[item.manager?.id!];
      if (parent) {
        // * 当前项有父节点
        parent.children = parent.children || [];
        parent.children.push(item);
      } else {
        // * 当前项没有父节点 -> 顶层
        parentList.push(item);
      }
    });
    return parentList;
  }

  listToTreeSimple = (data: any) => {
    const res: any[] = [];
    data.forEach((item: any) => {
      const parent = data.find((node: any) => node.id === item.parentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(item);
      } else {
        // * 根节点
        res.push(item);
      }
    });
    return res;
  }
}
