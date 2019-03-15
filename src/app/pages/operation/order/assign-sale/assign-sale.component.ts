import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-assign-sale',
  templateUrl: './assign-sale.component.html',
  styleUrls: ['./assign-sale.component.css']
})
export class AssignSaleComponent implements OnInit {
  @Input() orderId: any;
  @Input() saleId: any;
  @Input() saleEmail: any;
  @Input() store: any;

  public localStorageKey = 'assignSale';

  public sale;
  public sales = [];

  private isMe;

  constructor() { }

  ngOnInit() {
    this.sale = this.saleId;
    this.saleEmail = this.safeName(this.saleEmail);
  }

  safeName(email) {
    if (typeof email === 'undefined' || email === null || email === '') {
      return 'undefined';
    }
    return email.replace('@peacesoft.net', '').replace('@weshop.asia', '').replace('@gmail.com', '').replace('@yahoo.com', '').replace('@hotmail.com', '');
  }

  clearBoth(sales) {
    let clearSales = sales.filter(sale => Number(sale.id) !== Number(this.saleId));
    if (clearSales.length > 0) {
      clearSales = clearSales.map(sale => {
        return {id: sale.id, name: this.safeName(sale.email)};
      });
      return clearSales;
    }
    return [];
  }

}
