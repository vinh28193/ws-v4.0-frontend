import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderDataComponent} from '../../order-data.component';
import {OrderService} from '../../order.service';
import {PopupService} from '../../../../core/service/popup.service';
import {FormBuilder} from '@angular/forms';
import {ScopeService} from '../../../../core/service/scope.service';

@Component({
  selector: 'app-wallet-transactions',
  templateUrl: './wallet-transactions.component.html',
  styleUrls: ['./wallet-transactions.component.css']
})
export class WalletTransactionsComponent extends OrderDataComponent implements OnInit {
  @Input() walletTransaction: any;
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

  updateStatus(type, code) {
    this.popup.confirm(() => {
      this.orderService.put('pay/' + code, {type: type}).subscribe(rs => {
        const res: any = rs;
        if (rs.success) {
          this.popup.success(rs.success);
        } else {
          this.popup.error(rs.success);
        }
      });
    }, 'Do you want update ' + type + ' status for transaction?', 'Update');
  }
  getClassType(type) {
    switch (type.toLowerCase()) {
      case 'payment':
        return 'text-success';
        break;
      case 'refund':
        return 'text-danger';
        break;
      case 'addfee':
        return 'text-warring';
        break;
      default:
        return '';
        break;
    }
  }
  getClassStatus(status) {
    switch (status.toLowerCase()) {
      case 'success':
        return 'badge-success';
        break;
      case 'faild':
        return 'badge-danger';
        break;
      case 'cancel':
        return 'badge-warning';
        break;
      case 'create':
        return 'badge-info';
        break;
      default:
        return 'badge-dark';
        break;
    }
  }
}
