import { Pipe, PipeTransform } from '@angular/core';
import { ArrayKeyString } from '../models/common/array-key-string.model';

@Pipe({
  name: 'undefinedPipe'
})
export class UndefinedPipe implements PipeTransform {
  undefinedStaus: ArrayKeyString = {
    0: '未设置',
    1: '未填写',
    2: '未选择',
  };

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value) return value;
    const staus = args[0] ? args[0] as number : 0;
    return this.undefinedStaus[staus];
  }

}
