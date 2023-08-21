export class VacationCreateModel {
  employeeId?:number;
  startDate?:Date;
  endDate?:Date;
  reason?:string;
  status?:string;
  typeId?:number;
  operateTimes?:number;
  isOTChiefly?:boolean; //是否优先扣除OT

  constructor(partial: Partial<VacationCreateModel>) {
    Object.assign(this, partial);
  }
}
