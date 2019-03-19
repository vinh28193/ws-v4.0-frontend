import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quotation'
})
export class QuotationPipe implements PipeTransform {

  transform(value: any): any {
    switch (Number(value)) {
      case 0:
        return '';
      case 1:
        return '';
      default:
        return 'null';
    }
  }

}
