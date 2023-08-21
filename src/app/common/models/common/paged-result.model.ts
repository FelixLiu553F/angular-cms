import { ListResultModel } from "./list-result.model";

export declare class PagedResultModel<T> extends ListResultModel<T> {
    totalCount: number;
    constructor(initialValues?: Partial<PagedResultModel<T>>);
}
