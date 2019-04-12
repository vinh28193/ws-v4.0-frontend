import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderDataComponent} from '../order-data.component';
import {OrderService} from '../order.service';
import {PopupService} from '../../../core/service/popup.service';
import {FormBuilder} from '@angular/forms';
import {ScopeService} from '../../../core/service/scope.service';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent extends OrderDataComponent implements OnInit {
    private tabs: any [];
    updateProductId: any;
    productQ: any;
    idEdit = 0;
    fee = 0;
    oldfee = 0;
    public hidem: any = {};
    @Input() products: any;
    @Input() Employee_Purchase: any;
    @Input() storeID: any;
    @Output() editFee: EventEmitter<any> = new EventEmitter<any>();

    constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder , public global: ScopeService) {
        super(orderService);
    }

    ngOnInit() {
        this.tabs = [
            {id: 'purchase', title: 'Purchase Info', router: '/purchase'},
            {id: 'package', title: 'Package Info', router: 'detail-package-item'},
            {id: 'shipment', title: 'Delivery Info', router: '/shipment'},
            {id: 'payment', title: 'Refund/Addfee', router: '/return-addfee'}
        ];
    }

    showEditFee(ProFee) {
        this.idEdit = ProFee.id;
        this.fee = ProFee.local_amount;
        this.oldfee = ProFee.local_amount;
        this.updateProductId = ProFee.product_id;
    }

    keydownEvent($event) {
        if ($event.keyCode === 27) {
            this.idEdit = 0;
            this.fee = 0;
            this.updateProductId = 0;
        } else if ($event.keyCode === 13) {
            console.log('id ' + this.idEdit);
            console.log('fee ' + this.fee);
            if (this.oldfee === this.fee) {
                console.log('Không có thay đổi phí');
                this.idEdit = 0;
                this.fee = 0;
                this.updateProductId = 0;
            } else {
                const prodFee = this.setFeeChange();
                this.orderService.putProductFee('update/' + this.idEdit, prodFee).subscribe(rs => {
                    const res: any = rs;
                    if (res.success) {
                        console.log('Cập nhật thành công!');
                        this.editFee.emit(true);
                    } else {
                        prodFee.local_amount = this.oldfee;
                        this.editFee.emit(true);
                        this.popup.error(res.message);
                    }
                    this.idEdit = 0;
                    this.fee = 0;
                    this.updateProductId = 0;
                });
            }
        }
    }

    setFeeChange() {
        let proFee;
        for (let ind = 0; ind < this.products.length; ind++) {
            if (this.products[ind].id === this.updateProductId) {
                if (this.products[ind].productFees) {
                    for (let indx = 0; indx < this.products[ind].productFees.length; indx++) {
                        if (this.products[ind].productFees[indx].id === this.idEdit) {
                            this.products[ind].productFees[indx].local_amount = this.fee;
                            this.products[ind].productFees[indx].amount = this.fee / 23500;
                            proFee = this.products[ind].productFees[indx];
                        }
                    }
                }
            }
        }
        return proFee;
    }

    getTotalProductFee(fee) {
        let totalPro = 0;
        if (fee.length > 0) {
            for (let i = 0; i < fee.length; i++) {
                if (fee[i]['local_amount'] === undefined) {
                    fee[i]['local_amount'] = 0;
                }
                totalPro += fee[i]['local_amount'];
                return totalPro;
            }
        }
    }

    getProFee(fee, cusId) {
        console.log(cusId);
        if (fee === 'custom_fee' && cusId === null) {
            return false;
        }
        return true;
    }

    checkShowEdit(type) {
        return (type !== 'product_price_origin' && type !== 'tax_fee_origin' && type !== 'origin_shipping_fee');
    }
    checkClass(type) {
      if (type !== 'product_price_origin' && type !== 'tax_fee_origin' && type !== 'origin_shipping_fee') {
        return 2;
      }
    }
    checkShowFee(name) {
      if (name === 'tax_fee_origin' || name === 'origin_shipping_fee' || name === 'weshop_fee' || name === 'intl_shipping_fee' || name === 'import_fee' || name === 'custom_fee' || name === 'product_price_origin') {
        return true;
      }
    }
}
