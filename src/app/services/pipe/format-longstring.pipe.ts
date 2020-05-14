import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatLongstring'
})
export class FormatLongstringPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value.substr(0,130) + '...';
  }

}
