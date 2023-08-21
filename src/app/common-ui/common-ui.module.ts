import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickCardComponent } from './click-card/click-card.component';
import { SharedModule } from '../shared/shared.module';
import { AvatarComponent } from './avatar/avatar.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';

@NgModule({
  declarations: [
    ClickCardComponent,
    AvatarComponent,
    MultiSelectComponent,
    CustomSelectComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
  ],
  exports: [
    ClickCardComponent,
    AvatarComponent,
    MultiSelectComponent,
    CustomSelectComponent,
  ]
})
export class CommonUiModule { }
