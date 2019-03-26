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
        if (this.current_id !== this.updateProductId) {
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
}
