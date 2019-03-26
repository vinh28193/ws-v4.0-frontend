import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serialChar'
})
export class SerialCharPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const arrayNumber = 'abcdefghijklmnopqrstuvwxyz';
    return arrayNumber[value];
  }

}
