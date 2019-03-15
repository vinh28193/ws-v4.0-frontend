import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderType'
})
export class OrderTypePipe implements PipeTransform {

  transform(value: any): any {
    switch (Number(value)) {
      case 0:
        return 'SHOP';
      case 1:
        return 'Request';
      case 5:
        return 'Pos';
      case 6:
        return 'Ship';
      default:
        return 'Unknown';
    }
  }

}
