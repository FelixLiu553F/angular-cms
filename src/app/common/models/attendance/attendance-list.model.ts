import { EmployeeListModel } from '../employee/employee-list.model';

export class AttendanceListModel {
  id?: number;
  employee?: EmployeeListModel;
  createdDate?: Date;
}
