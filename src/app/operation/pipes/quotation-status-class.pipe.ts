import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quotationStatusClass'
})
export class QuotationStatusClassPipe implements PipeTransform {

  transform(value: any): any {
    switch (Number(value)) {
      case 0:
        return 'warning';
      case 1:
        return 'danger';
      case 2:
        return 'success';
      default:
        return 'default';
    }
  }

}
