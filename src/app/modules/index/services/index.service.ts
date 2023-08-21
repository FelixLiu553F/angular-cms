import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AttendanceListModel } from 'src/app/common/models/attendance/attendance-list.model';
import { HttpHelper } from 'src/app/common/utils/http-helper.service';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
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

  getTodayFirstAttendance = () => {
    const url = `api/attendance`;
    return lastValueFrom(this.http.get<Date>(url, this.httpOptions));
  };

  createAttendance = () => {
    const url = `api/attendance`;
    return lastValueFrom(this.http.post<boolean>(url, this.httpOptions));
  }
}
