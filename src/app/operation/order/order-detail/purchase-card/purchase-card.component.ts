import {Component, DoCheck, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {OrderService} from '../../order.service';
import {StorageService} from '../../../../core/service/storage.service';
import {PopupService} from '../../../../core/service/popup.service';
import {PopoverDirective} from 'ngx-bootstrap';

declare var swal: any;
declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'app-purchase-card',
    templateUrl: './purchase-card.component.html',
    styleUrls: ['./purchase-card.component.css']
})
export class PurchaseCardComponent implements OnInit, DoCheck {

    constructor(public orderService: OrderService, public storegate: StorageService, public pop: PopupService) {
    }

    @Input() updateProductId: any;
    @Input() clickBtn: false;
    @Output() closePopup: EventEmitter<any> = new EventEmitter<any>();
    @Output() searchEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('pop') pop: PopoverDirective;
    public current_id = 0;
    public orders: any;
    public form: any;
    public edit_id = 0;
    public totalPaid = 0;
    public totalChanging = 0;
    public totalAmountCanBuy = 0;
    public warehouse: any;
    public listAccount: any;
    public listCard: any;
    public data: any = {
        PPTranId: '',
        emailFragile: '',
        warehouse: '',
        emailPrice: '',
        accountPurchase: '',
        card_payment: '',
        buckAmount: '',
        orderIdPurchase: '',
        note: '',
        cart: {},
    };
    public identity: any;

    ngDoCheck(): void {
        if ((this.current_id !== this.updateProductId || this.clickBtn) && this.updateProductId !== undefined) {
            this.clickBtn = false;
            this.orders = null;
            this.current_id = this.updateProductId;
            this.getaccount();
            this.getCardPayment();
            this.getwarehouse();
            this.addcart();
        }
    }

    ngOnInit() {
        // this.addcart();
        this.identity = this.orderService.identity;
    }

    getaccount(nocache = false) {
        const type = this.orders ? this.orders[0].portal : 'all';
        this.listAccount = nocache ? null : JSON.parse(this.storegate.get('list_account_for_' + type));
        if (!this.listAccount) {
            this.orderService.getForPurchase('/list-account', undefined).subscribe(rs => {
                const res: any = rs;
                if (res.success) {
                    this.listAccount = res.data;
                    this.storegate.set('list_account_for_' + type, JSON.stringify(this.listAccount));
                } else {
                    this.storegate.set('list_account_for_' + type, null);
                }
            });
        }
    }

    ClearForm() {
        this.data = {
            PPTranId: '',
            emailFragile: '',
            warehouse: '',
            emailPrice: '',
            accountPurchase: '',
            card_payment: '',
            buckAmount: '',
            orderIdPurchase: '',
            note: '',
            cart: {},
        };
    }
    getCardPayment(nocache = false) {
        this.listCard = nocache ? null : JSON.parse(this.storegate.get('list_payment_card'));
        if (!this.listCard) {
            this.orderService.getListCardPayment('/list-card-payment', undefined).subscribe(rs => {
                const res: any = rs;
                if (res.success) {
                    this.listCard = res.data;
                    this.storegate.set('list_payment_card', JSON.stringify(this.listCard));
                }
            });
        }
    }

    addcart() {
        this.orderService.putPurchase('update/' + this.current_id, '').subscribe(rs => {
            const res: any = rs;
            if (res.success) {
                this.orders = res.data;
                this.setTotal();
                // this.pop.success(res.message);
            } else {
                this.pop.error(res.message);
            }
        });
    }

    totalAmount(product) {
        let total = 0;
        total += product.price_purchase ? parseFloat(product.price_purchase) : 0;
        total += product.us_ship_purchase ? parseFloat(product.us_ship_purchase) : 0;
        total += product.us_tax_purchase ? parseFloat(product.us_tax_purchase) : 0;
        total = product.quantityPurchase ? total * parseFloat(product.quantityPurchase) : 0;
        return total;
    }

    changeAmount(product) {
        product.paidToSeller = this.totalAmount(product);
        this.setTotal();
    }

    setTotal() {
        this.totalPaid = 0;
        this.totalChanging = 0;
        this.totalAmountCanBuy = 0;
        if (this.orders) {
            for (let ind = 0; this.orders.length > ind; ind++) {
                if (this.orders[ind].products) {
                    for (let indP = 0; this.orders[ind].products.length > indP; indP++) {
                        this.totalPaid += this.orders[ind].products[indP].paidToSeller;
                        this.totalAmountCanBuy += this.orders[ind].products[indP].paidTotal;
                    }
                }
            }
        }
        this.totalChanging = this.totalAmountCanBuy - this.totalPaid;
    }

    closePop() {
        this.closePopup.emit(true);
    }

    updatePurchase() {
        this.data.cart = this.orders;
        this.orderService.createCart('create', this.data).subscribe(rs => {
            const res: any = rs;
            if (res.success) {
                this.orders = [];
                this.searchEventClick();
                this.pop.success(res.message);
                this.closePop();
            } else {
                this.pop.error(res.message);
                this.closePop();
            }
        });
    }

    searchEventClick() {
        this.searchEvent.emit();
    }
    getwarehouse(nocache = false) {
        this.warehouse = nocache ? null : JSON.parse(this.storegate.get('list_warehouse'));
        if (!this.warehouse) {
            this.orderService.getListWarehouse('/list', undefined).subscribe(rs => {
                const res: any = rs;
                if (res.success) {
                    this.warehouse = res.data;
                    this.storegate.set('list_warehouse', JSON.stringify(this.warehouse));
                } else {
                    this.storegate.set('list_warehouse', null);
                }
            });
        }
    }

    removeCart(id, order_code) {
        this.pop.warning(() => {
            this.orderService.removeCartPurchase(id).subscribe(rs => {
                const res: any = rs;
                if (res.success) {
                    this.orders = res.data;
                    this.setTotal();
                    this.pop.success(res.message);
                } else {
                    this.pop.error(res.message);
                }
            });
        }, 'Do you want remove order ' + order_code + ' to cart?');
    }

    sendNotifyChanging() {
        this.data.cart = this.orders;
        this.orderService.postPurchaseService('send-notify-changing', this.data).subscribe(res => {
            const rs: any = res;
            if (rs.success) {
                this.searchEventClick();
                this.pop.success(rs.message);
                this.addcart();
            } else {
                this.pop.error(rs.message);
            }
        });
    }

    checkChangePrice() {
        let rs = false;
        if (this.orders) {
            for (let ind = 0; ind < this.orders.length; ind++) {
                if (this.orders[ind].products) {
                    for (let indP = 0; indP < this.orders[ind].products.length; indP++) {
                        if (this.orders[ind].products[indP].isChange) {
                            rs = true;
                            break;
                        }
                    }
                }
                if (rs) {
                    break;
                }
            }
        }
        return rs;
    }

    customerConfirmPrice() {
        this.pop.warning(() => {
            this.data.cart = this.orders;
            this.orderService.postPurchaseService('confirm-changing-price', this.data).subscribe(rs => {
                const res: any = rs;
                if (res.success) {
                    this.searchEventClick();
                    this.pop.success(res.message);
                    this.addcart();
                } else {
                    this.pop.error(res.message);
                }
            });
        }, 'Customer confirm changing price ?');
    }

    sendNotifyFragile() {
        this.data.cart = this.orders;
        this.orderService.postPurchaseService('send-notify-changing', this.data).subscribe(res => {
            const rs: any = res;
            if (rs.success) {
                this.searchEventClick();
                this.pop.success(rs.message);
                this.addcart();
            } else {
                this.pop.error(rs.message);
            }
        });
    }

    checkShowNotify() {
        let rs = false;
        if (this.orders) {
            for (let ind = 0; ind < this.orders.length; ind++) {
                if (this.orders[ind].products) {
                    for (let indP = 0; indP < this.orders[ind].products.length; indP++) {
                        if (this.orders[ind].products[indP].price_purchase !== this.orders[ind].products[indP].price
                            || this.orders[ind].products[indP].us_ship_purchase !== this.orders[ind].products[indP].us_ship
                            || this.orders[ind].products[indP].us_tax_purchase !== this.orders[ind].products[indP].us_tax
                        ) {
                            rs = true;
                            break;
                        }
                    }
                }
                if (rs) {
                    break;
                }
            }
        }
        return this.totalChanging && !this.checkChangePrice() && rs;
    }
}
