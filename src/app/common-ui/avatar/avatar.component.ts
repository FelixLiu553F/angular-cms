import { Component, Input, OnInit } from '@angular/core';
import { AvatarChangeModel } from '../models/avatar-change.model';

@Component({
  selector: 'f-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  @Input() imagePath!: string;
  @Input() accountName!: string;
  @Input() avatarSize?: number;
  avatarText = '';
  avatarStyle = {}

  constructor() { }

  ngOnInit() { }

  ngOnChanges(item: AvatarChangeModel): void {
    if (!this.accountName) return;
    if (!item.accountName && !item.imagePath) {
      this.avatarText = '';
      return;
    }
    this.avatarText = this.accountName[0]?.toUpperCase();
    const [darkColor, lightColor] = this.generateBackgroundColors(this.accountName);
    this.avatarStyle = {
      'color': darkColor,
      'background-color': lightColor
    }
  }

  generateBackgroundColors = (accountName: string) => {
    // 生成深色背景颜色
    let code = 0;
    for (let i = 0; i < accountName.length; i++) {
      code += accountName.charCodeAt(i);
    }
    const red = (code * 13) % 256;
    const green = (code * 7) % 256;
    const blue = (code * 19) % 256;
    const darkColor = `rgb(${red}, ${green}, ${blue})`;

    // 生成浅色背景颜色
    const lightRed = Math.min(red + 80, 255);
    const lightGreen = Math.min(green + 80, 255);
    const lightBlue = Math.min(blue + 80, 255);
    const lightColor = `rgb(${lightRed}, ${lightGreen}, ${lightBlue})`;

    // 返回生成的背景颜色
    return [darkColor, lightColor];
  }
}
