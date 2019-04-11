import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {OrderDataComponent} from '../../order-data.component';
import {OrderService} from '../../order.service';
import {PopupService} from '../../../../core/service/popup.service';
import {FormBuilder} from '@angular/forms';
import {PopoverDirective} from 'ngx-bootstrap';
import {ScopeService} from '../../../../core/service/scope.service';

@Component({
    selector: 'app-assign-sale',
    templateUrl: './assign-sale.component.html',
    styleUrls: ['./assign-sale.component.css']
})
export class AssignSaleComponent extends OrderDataComponent implements OnInit {
    @Input() orderId: any;
    @Input() saleSupport: any;
    @Input() saleAll: any;
    @Input() saleId: any;
    @Output() checkSale = new EventEmitter();
    public loadSale: boolean = false;

    @ViewChild('pop') pop: PopoverDirective;

    public oldSaleSupport;
    public sales: any = [];

    constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder, public scopeS: ScopeService) {
        super(orderService);
    }

    assignSale() {
        // if (this.oldSaleSupport.id === this.saleSupport.id || this.oldSaleSupport.id === this.allKey) {
        //     this.popup.error('pls select other sale');
        // }
        const messagePop = 'Do you want assign order ' + this.orderId + ' to new sale ';
        this.popup.warning(() => {
            this.orderService.put(`sale-support/${this.orderId}`, {sale_support_id: this.saleId}).subscribe(res => {
                if (res.success) {
                  this.loadSale = true;
                  this.checkSale.emit(this.loadSale);
                    this.popup.success(res.message);
                } else {
                    this.popup.error(res.message);
                }
            });
        }, messagePop);
    }

    ngOnInit() {
      this.sales = JSON.parse(localStorage.getItem('systemSale'));
        this.oldSaleSupport = this.saleSupport;
    }
}
