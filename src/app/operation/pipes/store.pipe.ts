import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'store'
})
export class StorePipe implements PipeTransform {

  transform(value: any) {
    switch (Number(value) ) {
      case 1:
        return 'Vietnam';
      case 6:
        return 'Malaysia';
      case 7:
        return 'Indonesia';
      case 9:
        return 'Philippines';
      case 10:
        return 'Thailand';
    }
  }

}
