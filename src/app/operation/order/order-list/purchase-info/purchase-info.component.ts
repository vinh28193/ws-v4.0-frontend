import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {OrderDataComponent} from '../../order-data.component';
import {OrderService} from '../../order.service';

@Component({
    selector: 'app-purchase-info',
    templateUrl: './purchase-info.component.html',
    styleUrls: ['./purchase-info.component.css']
})
export class PurchaseInfoComponent extends OrderDataComponent implements OnInit, DoCheck {

    @Input() order_id = null;
    @Input() openClick = false;
    public current_order_id = null;

    public filter: any = {
        orderCode: '',
        orderId: '',
        trackingCode: '',
        sku: '',
        purchaseInvoice: '',
        manifestCode: '',
        packageCode: '',
        status: ''
    };
    public data: any;

    ngDoCheck(): void {
        if (this.openClick && this.order_id !== this.current_order_id) {
            this.current_order_id = this.order_id;
            this.getPurchaseInfo();
        }
    }

    constructor(public service: OrderService) {
        super(service);
    }

    ngOnInit() {
    }

    getPurchaseInfo() {
        this.service.get('purchase/' + this.order_id).subscribe(rs => {
            if (rs.success) {
                this.service.popup.success(rs.message);
                this.data = rs.data;
            }
        });
    }
}
