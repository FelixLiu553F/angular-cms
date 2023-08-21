import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClickCardComponent } from '../../common-ui/click-card/click-card.component';
import { EmployeeListModel } from '../../common/models/employee/employee-list.model';
import { CommonService } from '../../common/services/common.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isCollapsed = false;
  isCardOpen = false;
  employee?: EmployeeListModel;
  avatarText?: string;
  @ViewChild(ClickCardComponent) clickCardComponent!: ClickCardComponent;
  isCardVisible = false;
  isHR = false;
  isLeader = false;
  isTest = false;

  constructor(
    private readonly router: Router,
    private readonly commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.loadEmployee();
    const role = sessionStorage.getItem('roles');
    this.isHR = role?.includes('HR') || false;
    this.isLeader = role?.includes('Leader') || false;
    this.isTest = role?.includes('Test') || false;
  }

  public logout = () => {
    sessionStorage.clear();
    this.router.navigateByUrl('login');
  };

  toggleCard = () => {
    this.isCardOpen = !this.isCardOpen;
  };

  loadEmployee = async () => {
    const result = await this.commonService.getEmployee();
    this.employee = result;
  };

  public onInfo = () => {
    this.isCardOpen = !this.isCardOpen;
    this.router.navigate(['staff/info']);
  };
}
