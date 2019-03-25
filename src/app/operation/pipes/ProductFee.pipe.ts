import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'ProductFee'
})
export class ProductFeePipe implements PipeTransform {

    transform(value: any) {
        switch (value) {
            case 'product_price_origin':
                return 'Product Price';
            case 'tax_fee_origin':
                return 'Tax Fee';
            case 'origin_shipping_fee':
                return 'Shipping Fee';
            case 'weshop_fee':
                return 'Weshop Fee';
            case 'intl_shipping_fee':
                return 'Inter nationnal Shipping Fee';
            case 'custom_fee' :
                return 'Customer Fee';
            case 'packing_fee':
                return 'Fee for packing packages';
            case 'inspection_fee':
                return 'Inspection fees ';
            case 'insurance_fee':
                return 'Insurance fees ';
            case 'vat_fee' :
                return 'VAT Fee';
        }

    }

}


