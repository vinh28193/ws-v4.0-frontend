import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currentStatus'
})
export class CurrentStatusPipe implements PipeTransform {

  transform(value: any): any {

    switch (value) {
      case 'NEW':
        return 'danger';
      case 'SUPPORTING':
        return 'warning';
      case 'SUPPORTED':
        return 'info';
      case 'SUPPORT FAIL':
        return 'danger';
      case 'READY2PURCHASE':
        return 'primary';
      case 'PURCHASING':
        return 'warning';
      case 'PURCHASE FAIL':
        return 'danger';
      case 'PURCHASE PENDING':
        return 'warning';
      case 'PURCHASED':
        return 'success';
      case 'EXPWH_STOCKIN':
        return 'warning';
      case 'EXPWH_HOLD':
        return 'danger';
      case 'EXPWH_READY2OUT':
        return 'success';
      case 'EXPWH_STOCKOUT':
        return 'success';
      case 'IMPWH_STOCKIN':
        return 'success';
      case 'IMPWH_HOLD':
        return 'success';
      case 'IMPWH_READY2OUT':
        return 'success';
      case 'IMPWH_STOCKOUT':
        return 'danger';
      case 'IMPWH_1RETURN':
        return 'warning';
      case 'IMPWH_2RETURN':
        return 'success';
      case 'CUSTOMER_RECEIVED':
        return 'success';
      case 'CANCEL':
        return 'warning';
      case 'REPLACED':
        return 'warning';
      default:
        return 'warning';
    }
  }

}
