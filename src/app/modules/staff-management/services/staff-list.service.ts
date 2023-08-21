import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { EmployeeCreateModel } from '../../../common/models/employee/employee-create.model';
import { PositionListModel } from '../../../common/models/position/position-list.model';
import { PositionQueryModel } from '../../../common/models/position/position-query.model';
import { PagedResultModel } from '../../../common/models/common/paged-result.model';
import { DepartmentListModel } from '../../../common/models/department/department-list.model';
import { DepartmentQueryModel } from '../../../common/models/department/department-query.model';
import { EmployeeListModel } from '../../../common/models/employee/employee-list.model';
import { EmployeeQueryModel } from '../../../common/models/employee/employee-query.model';
import { HttpHelper } from '../../../common/utils/http-helper.service';
import { EmployeeChangeModel } from 'src/app/common/models/employee/employee-change.model';

@Injectable({
  providedIn: 'root'
})
export class StaffListService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      pragma: 'no-cache'
    })
  };

  constructor(
    private readonly http: HttpClient,
    private readonly httpHelper: HttpHelper,
  ) { }

  findEmployeesByFilter = (filter: EmployeeQueryModel) => {
    const url = `api/employee/filter`;
    return lastValueFrom(this.http.get<PagedResultModel<EmployeeListModel>>(url, {
      ...this.httpOptions,
      ...{ params: this.httpHelper.getParams(filter) }
    }));
  };

  findDepartmentsByFilter = (filter?: DepartmentQueryModel) => {
    const url = `api/department/filter`;
    return lastValueFrom(this.http.get<PagedResultModel<DepartmentListModel>>(url, {
      ...this.httpOptions,
      ...{ params: this.httpHelper.getParams(filter) }
    }));
  };

  onExport = (filter?: EmployeeQueryModel) => {
    const self = this;
    const url = `api/employee/csv`;
    return this.http.get(url, {
      ...self.httpOptions,
      ...{ params: self.httpHelper.getParams(filter) },
      ...{ responseType: 'blob' },})
  };

  getOrganization = (id?: number) => {
    const url = `api/employee/organizational`;
    return lastValueFrom(this.http.get<EmployeeListModel[][]>(url, {...this.httpOptions,...{ params: this.httpHelper.getParams(id) }}));
  };

  findPositionsByFilter = (filter?: PositionQueryModel) => {
    const url = `api/position/filter`;
    return lastValueFrom(this.http.get<PagedResultModel<PositionListModel>>(url, {
      ...this.httpOptions,
      ...{ params: this.httpHelper.getParams(filter) }
    }));
  };

  createEmployee = (body: EmployeeCreateModel) => {
    const url = `api/employee`;
    return lastValueFrom(this.http.post<EmployeeListModel>(url, body, this.httpOptions));
  }

  updateEmployee = (id: number, body: EmployeeChangeModel) => {
    const url = `api/employee?id=${id}`;
    return lastValueFrom(this.http.put<EmployeeListModel>(url, body, this.httpOptions));
  }
}
