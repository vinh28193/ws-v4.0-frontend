import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeTracking'
})
export class TypeTrackingPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // switch (value) {
    //   case 'No'
    // }
  }

}
