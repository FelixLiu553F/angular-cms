import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HTTP_STATUS_CODE_ENUM } from '../enums/http-status-code.enum';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private readonly router: Router,
    private readonly message: NzMessageService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(tap(() => { }, (error) => {
      if (error.status === HTTP_STATUS_CODE_ENUM.UNAUTHORIZED) {
        token && this.message.error('登陆过期，请重新登陆！');
        this.router.navigate(['/login']);
      }
    }));
  }
}
