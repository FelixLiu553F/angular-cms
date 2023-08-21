import { EmployeeListModel } from "../employee/employee-list.model";
import { VacationTypeListModel } from "./vacation-type-list.model";

export class VacationListModel {
    id?: number;
    employee?: EmployeeListModel;
    createdDate?: Date;
    updatedDate?: Date;
    startDate?: Date;
    endDate?: Date;
    reason?: string;
    status?: string;
    type?: VacationTypeListModel;
    operateTimes?: number;
    operateRemainingTimes?: number;
    operateSubtractTimes?: number;
    operateLastYearRemainingTimes?: number;
    operateLastYearSubtractTimes?: number;
    operateOTRemainingTimes?: number;
    operateOTSubtractTimes?: number;
    cc?: string;
}