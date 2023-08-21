import { EmployeeListModel } from "../employee/employee-list.model";

export class DepartmentListModel {
  constructor(partial: Partial<DepartmentListModel>) {
    Object.assign(this, partial);
  }

  id?: number;
  name?: string;
  parentId?: number;
  leader?: EmployeeListModel;
}
