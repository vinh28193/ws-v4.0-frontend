import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderDataComponent} from '../order-data.component';
import {OrderService} from '../order.service';

@Component({
  selector: 'app-order-update-payment',
  templateUrl: './order-update-payment.component.html',
  styleUrls: ['./order-update-payment.component.css']
})
export class OrderUpdatePaymentComponent extends OrderDataComponent implements OnInit {


  @Input() order: any = {};
  @Input() type: string;

  @Output() close = new EventEmitter();

  public description;

  constructor(public http: OrderService) {
    super(http);
  }

  private _amount = 0;
  get amount(): number {
    if (this.type === 'addPayment') {
      if (this.order.total_paid_amount_local === 0) {
        this._amount = 0;
      } else {
        this._amount = this.order.total_final_amount_local - this.order.total_paid_amount_local;
      }
    } else if (this.type === 'markRefund') {
      this._amount = this.order.total_paid_amount_local;
    }
    return this._amount;
  }

  set amount(amount: number) {
    this._amount = amount;
  }

  ngOnInit() {
    this.amount = 0;
  }

  cancel() {
    this.close.emit(true);
  }

  update() {
    const fd = new FormData();
    fd.append('orderCode', this.order.ordercode);
    fd.append('type', this.type);
    fd.append('amount', String(this.amount));
    this.http.postNoLoad('order-s/update-payment', fd).subscribe(res => {
      const rs: any = res;
      if (rs.success) {
        this.cancel();
      }
    });
  }
}
