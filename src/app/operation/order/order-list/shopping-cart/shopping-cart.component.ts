import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OrderService} from '../../order.service';
import {PopupService} from '../../../../core/service/popup.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OrderDataComponent} from '../../order-data.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent extends OrderDataComponent implements OnInit {
  public ShoppingCar: any = [];
  public metaShopping: any = {};
  public hideme: any = {};
  public pro: any = {};
  public searchF: FormGroup;
  public perpage: number;
  public backorderlist = false;
  public limit: number = 20;
  public page: number = 1;
  @Output() backOrder = new EventEmitter();

  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
    super(orderService);
  }

  ngOnInit() {
    this.searchF = this.fb.group({
      value: '',
      keyword: 0,
    });
    this.listShoppingCart();
  }

  listShoppingCart() {
    const params = this.pSearch();
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

  pSearch() {
    const value = this.searchF.value;
    console.log(value);
    const params: any = {};
    if (value.value !== '') {
      params.value = value.value;
    }
    if (value.keyword !== '' && value.keyword !== 0) {
      params.keyword = value.keyword;
    }
    params.limit = this.limit;
    params.page = this.page;
    return params;
  }
  backOrderShopping() {
    this.backorderlist = true;
    this.backOrder.emit(this.backorderlist);
  }
}
