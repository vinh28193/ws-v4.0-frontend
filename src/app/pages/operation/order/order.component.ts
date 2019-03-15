import { Component, OnInit } from '@angular/core';
import {OrderService} from './order.service';
import {BaseComponent} from '../../../core/base.compoment';
import NumberFormat = Intl.NumberFormat;
import {toNumber} from 'ngx-bootstrap/timepicker/timepicker.utils';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent extends BaseComponent implements OnInit {
  public orders: any = [];
  public total: any;
  public limit: 20;
  public page: 1;
  constructor(private orderService: OrderService) {
    super(orderService);
  }
  ngOnInit() {
    this.listOrder();
  }

  listOrder() {
    this.orderService.getList('order', {limit: 20, page: 1}).subscribe(res => {
      this.orders = res.data;
      this.orders = Object.entries(res.data).map(e => {
        return e[1];
      });
      this.total = res.data.totalCount;
    });
  }
  quantityOrder(quantityC, quantityL) {
    let quantityA = 0;
    for (let i = 0; i < quantityL ; i++) {
      quantityA += quantityC[i]['quantity_customer'];
    }
    return quantityA;
  }


}
