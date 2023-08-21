import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { PagedResultModel } from 'src/app/common/models/common/paged-result.model';
import { DepartmentListModel } from 'src/app/common/models/department/department-list.model';
import { DepartmentQueryModel } from 'src/app/common/models/department/department-query.model';
import { VacationTypeListModel } from 'src/app/common/models/vacation/vacation-type-list.model';
import { HttpHelper } from 'src/app/common/utils/http-helper.service';

@Injectable({
  providedIn: 'root',
})
export class ManagementService {
  private apiUrl = 'api/load';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      pragma: 'no-cache',
    }),
  };

  constructor(
    private readonly http: HttpClient,
    private readonly httpHelper: HttpHelper
  ) {}

  findVacationTypes = () => {
    const url = `api/vacation/types`;
    return lastValueFrom(
      this.http.get<VacationTypeListModel[]>(url, this.httpOptions)
    );
  };

  findDepartmentsByFilter = (filter?: DepartmentQueryModel) => {
    const url = `api/department/filter`;
    return lastValueFrom(
      this.http.get<PagedResultModel<DepartmentListModel>>(url, {
        ...this.httpOptions,
        ...{ params: this.httpHelper.getParams(filter) },
      })
    );
  };

  editDepartment(id: number, name: string) {
    const url = `api/department/management`;
    return lastValueFrom(
      this.http.put(url, { id: id, name: name }, this.httpOptions)
    );
  }

  insertDepartment(name: string) {
    const url = `api/department/management`;
    return lastValueFrom(this.http.post(url, { name: name }, this.httpOptions));
  }

  deleteDepartment(id: number) {
    const url = `api/department/management?id=${id}`;
    return lastValueFrom(this.http.delete(url, this.httpOptions));
  }

  editVacation(id: number, name: string) {
    const url = `api/vacation/management`;
    return lastValueFrom(
      this.http.put(url, { id: id, name: name }, this.httpOptions)
    );
  }

  insertVacation(name: string) {
    const url = `api/vacation/management`;
    return lastValueFrom(this.http.post(url, { name: name }, this.httpOptions));
  }

  deleteVacation(id: number) {
    const url = `api/vacation/management?id=${id}`;
    return lastValueFrom(this.http.delete(url, this.httpOptions));
  }
}
