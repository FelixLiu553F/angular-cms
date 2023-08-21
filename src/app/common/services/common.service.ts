import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EmployeeListModel } from '../models/employee/employee-list.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private baseUrl = 'api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      pragma: 'no-cache'
    })
  };

  constructor(private http: HttpClient) { }

  getEmployee = async () => {
    const url = `${this.baseUrl}/employee`;
    return firstValueFrom(this.http.get<EmployeeListModel>(url, this.httpOptions));
  }
}
