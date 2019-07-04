import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderDataComponent} from '../../order-data.component';
import {OrderService} from '../../order.service';
import {PopupService} from '../../../../core/service/popup.service';
import {FormBuilder} from '@angular/forms';
import {ScopeService} from '../../../../core/service/scope.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-wallet-transactions',
  templateUrl: './wallet-transactions.component.html',
  styleUrls: ['./wallet-transactions.component.css']
})
export class WalletTransactionsComponent extends OrderDataComponent implements OnInit {
  @Input() walletTransactions: any;
  @Input() check_update_payment: any;
  @Input() order_code = '';
  @Output() showPopup: EventEmitter<any> = new EventEmitter<any>();

  constructor(private orderService: OrderService,
              private popup: PopupService,
              private fb: FormBuilder,
              public _sp: ScopeService,
  ) {
    super(orderService);
  }

  ngOnInit() {
    if (this.check_update_payment === 1) {
        this.orderService.put(`pay/${this.order_code}`, undefined).subscribe(res => {
        });
    }
  }
  checkView() {
    if (this._sp.checkSuperAdmin()) {
      return true;
    }  else  {
      return false;
    }
  }
  addTransaction() {
    this.showPopup.emit({code: this.order_code});
  }
}
