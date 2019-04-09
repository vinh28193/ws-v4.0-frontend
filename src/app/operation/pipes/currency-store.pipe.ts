import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'currencyStore'
})
export class CurrencyStorePipe implements PipeTransform {

    transform(value: any): any {
        switch (Number(value)) {
            case 1:
                return 'đ';
                break;
            default:
                return '$';
                break;
        }
    }

}
