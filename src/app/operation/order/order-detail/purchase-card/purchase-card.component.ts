import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {OrderService} from '../../order.service';

@Component({
    selector: 'app-purchase-card',
    templateUrl: './purchase-card.component.html',
    styleUrls: ['./purchase-card.component.css']
})
export class PurchaseCardComponent implements OnInit, DoCheck {

    constructor(public orderService: OrderService) {
    }

    @Input() updateProductId: any;
    public current_id = 0;
    public orders: any;

    ngDoCheck(): void {
        if (this.current_id !== this.updateProductId && this.updateProductId !== undefined ) {
            console.log('chhange');
            this.current_id = this.updateProductId;
            this.addcart();
        }
    }

    ngOnInit() {
        // this.addcart();
    }

    addcart() {
        console.log(this.current_id);
        this.orderService.putPurchase('update/' + this.current_id, '').subscribe(rs => {
            const res: any = rs;
            if (res.success) {
                this.orders = res.data;
                console.log(this.orders);
            }
        });
    }

    totalAmount(product) {
        let total = 0;
        total += product.price_purchase ? parseFloat(product.price_purchase) : 0;
        total += product.us_ship_purchase ? parseFloat( product.us_ship_purchase) : 0;
        total += product.us_tax_purchase ? parseFloat(product.us_tax_purchase) : 0;
        total = product.quantityPurchase ? total * parseFloat(product.quantityPurchase) : 0;
        return total;
    }

    changeAmount(product) {
        product.paidToSeller = this.totalAmount(product);
    }
}
