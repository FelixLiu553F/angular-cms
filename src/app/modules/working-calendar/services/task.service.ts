import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../../../common/utils/http-helper.service';
import { lastValueFrom } from 'rxjs';
import { PagedResultModel } from '../../../common/models/common/paged-result.model';
import { EmployeeListModel } from '../../../common/models/employee/employee-list.model';
import { EmployeeQueryModel } from '../../../common/models/employee/employee-query.model';
import { TaskCreateModel } from 'src/app/common/models/task/task-create.model';
import { TaskListModel } from 'src/app/common/models/task/task-list.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
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

  findEmployeesByFilter = (filter: EmployeeQueryModel) => {
    const url = `api/employee/filter`;
    return lastValueFrom(
      this.http.get<PagedResultModel<EmployeeListModel>>(url, {
        ...this.httpOptions,
        ...{ params: this.httpHelper.getParams(filter) },
      })
    );
  };

  async createTask(body: TaskCreateModel) {
    const url = `api/task`;
    return lastValueFrom(
      this.http.post<PagedResultModel<EmployeeListModel>>(
        url,
        body,
        this.httpOptions
      )
    );
  }

  async getTaskByAssigneeId() {
    const url = 'api/task';
    return lastValueFrom(this.http.get<TaskListModel[]>(url, this.httpOptions));
  }
}
