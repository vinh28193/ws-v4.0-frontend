import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  @Input() products: any = null;
  @Input() new: any = null;
  @Input() purchased: any = null;
  @Input() seller_shipped: any = null;
  @Input() stockin_us: any = null;
  @Input() stockout_us: any = null;
  @Input() stockin_local: any = null;
  @Input() stockout_local: any = null;
  @Input() at_customer: any = null;
  @Input() returned: any = null;
  @Input() cancelled: any = null;
  @Input() lost: any = null;
  private tabs: any [];

  constructor() { }

  ngOnInit() {
    this.tabs = [
      {id: 'purchase', title: 'Purchase Info', router: '/purchase'},
      {id: 'package', title: 'Package Info', router: '/package'},
      {id: 'shipment', title: 'Delivery Info', router: '/shipment'},
      {id: 'payment', title: 'Refund/Addfee', router: '/return-addfee'}
    ];
  }

}
