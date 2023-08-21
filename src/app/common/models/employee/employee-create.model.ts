import { PositionListModel } from "../position/position-list.model";

export class EmployeeCreateModel {
  id?: number;
  email?: string;
  account?: string;
  accountName?: string | null;
  chineseName?: string | null;
  mobile?: string | null;
  isActive?: number;
  passWord?: string;
  managerId?: number;
  gender?: number;
  birth?: Date;
  positionId?: number;
  operateRemainingTimes?: number;
  operateLastYearRemainingTimes?: number;
  operateOTRemainingTimes?: number;
  departmentId?: number;
  avatar?: string;

  constructor(partial: Partial<EmployeeCreateModel>) {
    Object.assign(this, partial);
  }
}
