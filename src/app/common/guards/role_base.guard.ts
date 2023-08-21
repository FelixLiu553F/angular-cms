import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class RoleBaseGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly message: NzMessageService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): true | UrlTree {
    const url: string = state.url; // 将要跳转的路径
    
    return this.RoleBaseGuard(url);
  }

  private RoleBaseGuard(url: string): true | UrlTree {
    let token = sessionStorage.getItem('token');
    if (token) {
      return true;
    }
    this.message.error("请先进行登录");
    return this.router.parseUrl('login');
  }
}
