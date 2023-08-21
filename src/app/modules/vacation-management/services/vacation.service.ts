import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { VacationCreateModel } from '../../../common/models/vacation/vacation-create,model';
import { VacationTypeListModel } from '../../../common/models/vacation/vacation-type-list.model';
import { VacationQueryModel } from '../../../common/models/vacation/vacation-query.model';
import { HttpHelper } from '../../../common/utils/http-helper.service';
import { VacationListModel } from '../../../common/models/vacation/vacation-list.model';

@Injectable({
  providedIn: 'root',
})
export class VacationService {
  private baseUrl = 'api/vacation';
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
    const url = `${this.baseUrl}/types`;
    return lastValueFrom(
      this.http.get<VacationTypeListModel[]>(url, this.httpOptions)
    );
  };

  createVacation = (body: VacationCreateModel) => {
    const url = `${this.baseUrl}`;
    return lastValueFrom(
      this.http.post<VacationCreateModel>(url, body, this.httpOptions)
    );
  };

  findVacationsByFilter = (filter: VacationQueryModel) => {
    const url = `${this.baseUrl}/filter`;
    return lastValueFrom(
      this.http.get<VacationListModel[]>(url, {
        ...this.httpOptions,
        ...{ params: this.httpHelper.getParams(filter) },
      })
    );
  };

  getVacationsById = (id: number) => {
    const url = `${this.baseUrl}`;
    return lastValueFrom(
      this.http.get<VacationListModel>(url, this.httpOptions)
    );
  };

  getApproval() {
    const url = `${this.baseUrl}/approval`;
    return lastValueFrom(
      this.http.get<VacationListModel[]>(url, this.httpOptions)
    );
  }

  onApprove(id: number) {
    const url = `${this.baseUrl}/approve`;
    console.log(id)
    return lastValueFrom(this.http.put(url, {id: id}, this.httpOptions));
  }

  onReject(id: number) {
    const url = `${this.baseUrl}/reject`;
    return lastValueFrom(this.http.put(url, {id: id}, this.httpOptions));
  }
}
