import { EmployeeListModel } from "../employee/employee-list.model";


export class TaskListModel {
  id?: number;
  createdDate?: Date;
  startDate?: Date;
  endDate?: Date;
  name?: string;
  content?: string;
  author?: EmployeeListModel;
  assignee?: EmployeeListModel;

}
