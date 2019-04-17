import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markSupporting'
})
export class MarkSupportingPipe implements PipeTransform {

  transform(value: any): any {
    switch (Number(value)) {
      case 1:
        return 'Chờ mặc cả';
      case 2:
        return 'Chờ khách hàng phản hồi';
      case 3:
        return 'Chờ người bán phản hồi';
      case 4:
        return 'Chờ người bán phản hồi';
      case 5:
        return 'Chờ người bán phản hồi';
      case 6:
        return 'Chờ người bán phản hồi';
      default:
        return '';
    }
  }

}
