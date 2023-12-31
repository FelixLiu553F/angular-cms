import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  jumpToRequest = () => {
    this.router.navigateByUrl('vacation/request');
  };

  jumpToWorkingCalendar() {
    this.router.navigateByUrl('calendar/working');
  }
}
