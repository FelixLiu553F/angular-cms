import { PagedRequestModel } from "../common/paged-request.model";

export class VacationQueryModel extends PagedRequestModel {
  employeeId?: number;
  status?: number;
  type?: number;
  createdDate?: Date;
}
