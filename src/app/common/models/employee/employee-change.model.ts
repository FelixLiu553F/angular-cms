import { DepartmentListModel } from "../department/department-list.model";
import { PositionListModel } from "../position/position-list.model";

export class EmployeeChangeModel {
  constructor(partial: Partial<EmployeeChangeModel>) {
    Object.assign(this, partial);
  }

  id?: number;
  email?: string; // 账号设置
  account?: string;
  accountName?: string | null;
  chineseName?: string | null;
  mobile?: string | null; // 账号设置
  isActive?: number; // 需要权限
  passWord?: string; // 账号设置
  managerId?: number; // 需要权限
  gender?: number;
  birth?: Date;
  positionId?: number; // 需要权限
  departmentId?: number; // 需要权限
  avatar?: string;
}
