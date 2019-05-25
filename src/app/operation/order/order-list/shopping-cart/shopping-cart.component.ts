import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OrderService} from '../../order.service';
import {PopupService} from '../../../../core/service/popup.service';
import {FormBuilder} from '@angular/forms';
import {OrderDataComponent} from '../../order-data.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent extends OrderDataComponent implements OnInit {
  public checkShoppingCart = false;
  public ShoppingCar: any = [];
  public metaShopping: any = {};
  public hideme: any = {};
  public pro: any = {};

  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
    super(orderService);
  }

  ngOnInit() {
    this.listShoppingCart();
  }

  listShoppingCart() {
    this.orderService.ListShopping(undefined).subscribe(res => {
      this.ShoppingCar = res.data._items;
      console.log(this.ShoppingCar);
      this.metaShopping = res.data._meta;
    });
  }

  getChangeAmount(price1, price2) {
    return price1 - price2;
  }

}
