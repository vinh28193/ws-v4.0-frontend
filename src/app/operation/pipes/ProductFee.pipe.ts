import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'ProductFee'
})
export class ProductFeePipe implements PipeTransform {

    transform(value: any) {
        switch ((value.trim())) {
            case 'product_price':
                return 'Product Price';
            case 'tax_fee':
                return 'Tax Fee';
            case 'shipping_fee':
                return 'Shipping Fee';
            case 'weshop_fee':
                return 'Weshop Fee';
            case 'intl_shipping_fee':
                return 'International Shipping Fee';
            case 'custom_fee' :
                return 'Custom Fee';
            case 'packing_fee' :
                return 'Fee for packing packages';
            case 'inspection_fee':
                return 'Inspection fees ';
            case 'insurance_fee':
                return 'Insurance fees ';
            case 'vat_fee' :
                return 'VAT Fee';
            case 'import_fee':
                return 'Import Fee';
            case 'purchase_fee':
              return 'Purchase Fee';
            default :
                return 'Unknow Fee';
        }

    }

}


