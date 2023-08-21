export class PagedRequestModel {
  constructor(partial?: Partial<PagedRequestModel>) {
    Object.assign(this, partial);
  }

  skipCount?: number;
  maxResultCount?: number;
}
