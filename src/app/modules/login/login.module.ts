import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginService } from './services/login.service';
import { VacationManagementComponent } from './vacation-management/vacation-management.component';
import { DepartmentManagementComponent } from './department-management/department-management.component';
import { CommonUiModule } from 'src/app/common-ui/common-ui.module';
import { IndexModule } from '../index/index.module';

const services = [LoginService];

const modeles = [
  CommonModule,
  LoginRoutingModule,
  SharedModule,
  IndexModule,
  CommonUiModule
];

@NgModule({
  declarations: [LoginComponent, VacationManagementComponent, DepartmentManagementComponent],
  imports: [...modeles],
  providers: [...services]
})
export class LoginModule { }
