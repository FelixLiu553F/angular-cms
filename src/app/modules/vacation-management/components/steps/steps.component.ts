import { Component, Input, OnInit } from '@angular/core';
import { VacationStatusStatus } from '../../enums/vacation-status.enum';

@Component({
  selector: 'vacation-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  @Input() status!: string;
  VacationStatusStatus = VacationStatusStatus;

  constructor() { }

  ngOnInit(): void {
  }

}
