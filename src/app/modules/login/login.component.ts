import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoginQueryModel } from './models/login-query.model';
import * as CanvasNest from '../../../assets/canvas/canvas-nest.js';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly message: NzMessageService
  ) {}

  ngOnInit() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('roles');
    CanvasNest.fn();
    this.buildForm();
  }

  buildForm = () => {
    this.form = this.fb.group({
      account: [, Validators.required],
      password: [, Validators.required],
    });
  };

  login = async () => {
    if (!this.form.valid) {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }
    const data = await this.loginService.login({
      username: this.form.value.account,
      password: this.form.value.password,
    } as LoginQueryModel).catch((err) => {
      this.message.error(err.error.message);
    });
    if(!data) return;
    sessionStorage.setItem('token', data?.access_token!);
    const roles = await this.loginService.getEmployeeRoles();
    sessionStorage.setItem('roles', roles.map((o) => o.role?.name).join(','));
    console.log(sessionStorage.getItem('roles'))
    this.router.navigateByUrl('index');
  };
}
