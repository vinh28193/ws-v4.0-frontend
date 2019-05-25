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
  public perpage: number;
  public limit: number = 20;
  public page: number = 1;

  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
    super(orderService);
  }

  ngOnInit() {
    this.listShoppingCart();
  }

  listShoppingCart() {
    const params: any = {};
    params.limit = this.limit;
    params.page = this.page;
    this.orderService.ListShopping(params).subscribe(res => {
      this.ShoppingCar = res.data._items;
      this.metaShopping = res.data._meta;
      if (this.metaShopping.totalCount >= this.limit) {
        this.perpage = Math.floor(this.metaShopping.totalCount / this.limit);
        console.log(this.perpage);
      } else {
        this.perpage = 1;
      }
    });
  }

  getChangeAmount(price1, price2) {
    return price1 - price2;
  }

  handlePagination(event) {
    this.page = event.page;
    this.listShoppingCart();
  }

  handlePerPage(event) {
    this.limit = event.target.value;
    this.listShoppingCart();
  }

}
