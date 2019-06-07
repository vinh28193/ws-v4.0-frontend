import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notificationBackground'
})
export class NotificationBackgroundPipe implements PipeTransform {

  transform(value: any) {
    switch (Number(value) ) {
      case 1:
        return 'white';
      case 0:
        return 'light-info';
    }
  }

}
