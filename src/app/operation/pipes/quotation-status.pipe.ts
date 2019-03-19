import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quotationStatus'
})
export class QuotationStatusPipe implements PipeTransform {

  transform(value: any): any {
    switch (Number(value)) {
      case 0:
        return 'pending';
      case 1:
        return 'approve';
      case 2:
        return 'deny';
      default:
        return 'null';
    }
  }

}
