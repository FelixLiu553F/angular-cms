export class PositionListModel {
  constructor(partial: Partial<PositionListModel>) {
    Object.assign(this, partial);
  }

  id?: number;
  level?: string;
  title?: string;
  initialAnnualLeave?: number;
}
