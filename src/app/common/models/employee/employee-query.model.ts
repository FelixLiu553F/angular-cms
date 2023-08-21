import { PagedRequestModel } from "../common/paged-request.model";

export class EmployeeQueryModel extends PagedRequestModel {
  constructor(partial: Partial<EmployeeQueryModel>) {
    super(partial);
    Object.assign(this, partial);
  }

  isActive?: number;
  departmentId?: number;
  userName?: string;
  managerId?: number;
}
