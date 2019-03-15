import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconFlag'
})
export class IconFlagPipe implements PipeTransform {

  transform(value: any): any {
    switch (Number(value)) {
      case 1:
        return 'flag-icon flag-icon-vn';
      case 7:
        return 'flag-icon flag-icon-id';
      case 6:
        return 'flag-icon flag-icon-my';
      case 10:
        return 'flag-icon flag-icon-th';
    }
  }

}
