import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderTypeClass'
})
export class OrderTypeClassPipe implements PipeTransform {

  transform(value: any): any {

    switch (value) {
      case 'SHIP':
        return 'success';
      case 'SHOP':
        return 'primary';
      case 'POS':
        return 'warning';
      case 'REQUEST':
        return 'danger';
      default:
        return 'dark';
    }
  }

}
