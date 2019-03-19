import { Component, OnInit } from '@angular/core';
import {OrderService} from './order.service';
import {BaseComponent} from '../../../core/base.compoment';
import {HttpParams} from '@angular/common/http';
// import NumberFormat = Intl.NumberFormat;
// import {toNumber} from 'ngx-bootstrap/timepicker/timepicker.utils';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent extends BaseComponent implements OnInit {
  public orders: any = [];
  public total: any;
  private limit: 20;
  private page: 1;
  public filter: any = {};
  public status: any;
  constructor(private orderService: OrderService) {
    super(orderService);
  }
  ngOnInit() {
    this.listOrder();
  }

  listOrder() {
    this.limit = 20;
    this.page = 1;
    const param: any = {};
    param.t = this.filter.status;
    this.orderService.getList(`${'order'}?limit=${this.limit}&page=${this.page}`, {param}).subscribe(res => {
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
