import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {OrderDataComponent} from '../../order-data.component';
import {OrderService} from '../../order.service';
import {PopupService} from '../../../../core/service/popup.service';
import {FormBuilder} from '@angular/forms';
import {PopoverDirective} from 'ngx-bootstrap';

@Component({
    selector: 'app-assign-sale',
    templateUrl: './assign-sale.component.html',
    styleUrls: ['./assign-sale.component.css']
})
export class AssignSaleComponent extends OrderDataComponent implements OnInit {
    @Input() orderId: any;
    @Input() saleSupport: any;
    @Input() saleAll: any;

    @ViewChild('pop') pop: PopoverDirective;

    public oldSaleSupport;

    constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
        super(orderService);
    }

    onChangeSale(event) {
        const target = event.target;
        this.saleSupport.id = target.value;
        const selectedOptions = target.options;
        const selectedIndex = selectedOptions.selectedIndex;
        this.saleSupport.username = selectedOptions[selectedIndex].text;
    }

    assignSale() {
        if (this.oldSaleSupport.id === this.saleSupport.id || this.oldSaleSupport.id === this.allKey) {
            this.popup.error('pls select other sale');
        }
        const messagePop = 'Do you want assign order ' + this.orderId + ' to new sale ' + this.saleSupport.username;
        this.popup.warning(() => {
            this.orderService.put(`sale-support/${this.orderId}`, {sale_support_id: this.saleSupport.id}).subscribe(res => {
                if (res.success) {
                    this.popup.success(res.message);
                } else {
                    this.popup.error(res.message);
                }
            });
        }, messagePop);
    }

    ngOnInit() {
        this.oldSaleSupport = this.saleSupport;
    }

}
