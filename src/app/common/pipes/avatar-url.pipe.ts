import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarUrlPipe'
})
export class AvatarUrlPipe implements PipeTransform {

  transform(value: string, prefix: string): string {
    return `${prefix}${value}`;
  }

}
