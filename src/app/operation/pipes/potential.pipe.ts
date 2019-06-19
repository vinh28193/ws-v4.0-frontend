import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'potential'
})
export class PotentialPipe implements PipeTransform {

  transform(value: any): any {
    switch (Number(value)) {
      case 0:
        return '';
        break;
      case 1:
        return 'Potential';
        break;
    }
  }

}
