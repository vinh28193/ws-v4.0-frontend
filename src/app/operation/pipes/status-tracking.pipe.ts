import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusTracking'
})
export class StatusTrackingPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 'US_RECEIVED':
        return 'badge-danger';
        break;
      case 'US_SENDING':
        return 'badge-warning';
        break;
      case 'LOCAL_RECEIVED':
        return 'badge-red';
        break;
      case 'LOCAL_INSPECTED':
        return 'badge-red';
        break;
      case 'CREATED_SHIPMENT':
        return 'badge-purple';
        break;
      case 'DELIVERING':
        return 'badge-info';
        break;
      case 'AT_CUSTOMER':
        return 'badge-success';
        break;
      default:
        return 'badge-info';
        break;
    }
  }

}
