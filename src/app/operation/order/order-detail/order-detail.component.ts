import {Component, Input, OnInit} from '@angular/core';
import {OrderDataComponent} from '../order-data.component';
import {OrderService} from '../order.service';
import {PopupService} from '../../../core/service/popup.service';
import {FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent extends OrderDataComponent implements OnInit {

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

  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
    super(orderService);
  }

  ngOnInit() {
    this.tabs = [
      {id: 'purchase', title: 'Purchase Info', router: '/purchase'},
      {id: 'package', title: 'Package Info', router: 'detail-package-item'},
      {id: 'shipment', title: 'Delivery Info', router: '/shipment'},
      {id: 'payment', title: 'Refund/Addfee', router: '/return-addfee'}
    ];
  }

}
