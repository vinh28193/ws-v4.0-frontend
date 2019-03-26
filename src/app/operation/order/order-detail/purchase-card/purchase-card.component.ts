import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderService} from '../../order.service';
import {EventHandlerVars} from '@angular/compiler/src/compiler_util/expression_converter';

declare var swal: any;
declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'app-purchase-card',
    templateUrl: './purchase-card.component.html',
    styleUrls: ['./purchase-card.component.css']
})
export class PurchaseCardComponent implements OnInit, DoCheck {

    constructor(public orderService: OrderService) {
    }

    @Input() updateProductId: any;
    @Output() closePopup: EventEmitter<any> = new EventEmitter<any>();
    public current_id = 0;
    public orders: any;
    public form: any;
    public edit_id = 0;
    public totalPaid = 0;
    public totalChanging = 0;
    public totalAmountCanBuy = 0;
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
    };

    ngDoCheck(): void {
        if (this.current_id !== this.updateProductId && this.updateProductId !== undefined) {
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
                this.setTotal();
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
}
