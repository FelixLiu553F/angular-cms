import { Component, OnInit } from '@angular/core';
import { IndexService } from '../../services/index.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'punch-card',
  templateUrl: './punch-card.component.html',
  styleUrls: ['./punch-card.component.css'],
})
export class PunchCardComponent implements OnInit {
  firstAttendanceDate?: number;
  isLoading = false;
  hours = '00';
  minutes = '00';
  seconds = '00';

  constructor(
    private readonly service: IndexService,
    private readonly message: NzMessageService
  ) {}

  async ngOnInit() {
    await this.initialCountDown();
  }

  initialCountDown = async () => {
    this.isLoading = true;
    this.firstAttendanceDate = new Date(
      await this.service.getTodayFirstAttendance()
    ).getTime();
    this.isLoading = false;
    const duration = 8 * 60 * 60; // 总倒计时长为一天
    const endTime = this.firstAttendanceDate + duration * 1000; // 一天后结束
    this.updateCountdown(endTime);
    setInterval(() => this.updateCountdown(endTime), 1000); // 每秒钟更新一次
  };

  private updateCountdown(endTime: number) {
    const timeRemaining = Math.round((endTime - Date.now()) / 1000); // 剩余秒数
    if (timeRemaining < 0) {
      this.hours = '00';
      this.minutes = '00';
      this.seconds = '00';
    } else {
      const hours = Math.floor(timeRemaining / 3600);
      const minutes = Math.floor((timeRemaining % 3600) / 60);
      const seconds = timeRemaining % 60;
      this.hours = hours.toString().padStart(2, '0');
      this.minutes = minutes.toString().padStart(2, '0');
      this.seconds = seconds.toString().padStart(2, '0');
    }
  }

  punchCard = async () => {
    const result = await this.service.createAttendance();
    if (result) {
      if (!this.firstAttendanceDate) {
        await this.initialCountDown();
      }
      this.message.success('success');
    } else {
      this.message.error('error');
    }
  };
}
