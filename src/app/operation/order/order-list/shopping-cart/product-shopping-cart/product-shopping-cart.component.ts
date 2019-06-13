import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../../../order.service';
import {PopupService} from '../../../../../core/service/popup.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OrderDataComponent} from '../../../order-data.component';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-product-shopping-cart',
  templateUrl: './product-shopping-cart.component.html',
  styleUrls: ['./product-shopping-cart.component.css']
})
export class ProductShoppingCartComponent extends OrderDataComponent implements OnInit {
  @Input() products: any = [];
  @Input() orderId: any = null;
  @Input() policy: any = [];
  @Input() type: any = [];
  @Input() orderCode: any = [];
  public id: any;

  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder, public notifi: NotifierService) {
    super(orderService);
  }

  ngOnInit() {
  }
  itemSubtotalAmount(a, b, c) {
    const totalSubtotalAmount = a + b + c;
    return totalSubtotalAmount;
  }
  itemSubtotalLocal(a, b, c) {
    const totalSubtotalLocal = a + b + c;
    return totalSubtotalLocal;
  }
}
