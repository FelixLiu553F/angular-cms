import { DepartmentListModel } from "../department/department-list.model";
import { PositionListModel } from "../position/position-list.model";

export class EmployeeListModel {
  constructor(partial?: Partial<EmployeeListModel>) {
    Object.assign(this, partial);
  }

  id?: number;
  email?: string;
  account?: string;
  accountName?: string | null;
  chineseName?: string | null;
  mobile?: string | null;
  isActive?: number;
  manager?: EmployeeListModel;
  gender?: number;
  birth?: Date;
  position?: PositionListModel;
  department?: DepartmentListModel;
  operateRemainingTimes?: number;
  operateLastYearRemainingTimes?: number;
  operateOTRemainingTimes?: number;
  avatar?: string;
  isSelf?: boolean;
}
