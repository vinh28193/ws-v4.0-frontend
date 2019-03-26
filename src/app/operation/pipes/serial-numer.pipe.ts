import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'serialNumer'
})
export class SerialNumerPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        const arrayNumber = ',I,II,III,IV,V,VI,VII,VIII,IX,X';
        const arr = arrayNumber.split(',');
        value = value === 0 ? 1 : value;
        if (value <= 10) {
            return arr[value];
        } else if (10 < value && value < 40) {
            return arr[Math.floor((value / 10))] + '' + arr[value % 10];
        } else if (40 <= value && value < 50) {
            return value === 40 ? 'XL' : 'XL' + arr[value % 10];
        } else if (50 <= value && value < 90) {
            return value === 50 ? 'L' : 'L' + arr[Math.floor((value / 50)) - 1] + arr[value % 10];
        } else if (90 <= value && value <= 100) {
            if (value === 100) {
                return 'C';
            }
            return value === 90 ? 'XC' : 'XC' + arr[value % 10];
        } else {
            return '---';
        }
    }

}
