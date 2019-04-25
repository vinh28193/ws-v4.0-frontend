import {Component, Input, OnInit} from '@angular/core';
import {OrderDataComponent} from '../../order-data.component';
import {OrderService} from '../../order.service';
import {PopupService} from '../../../../core/service/popup.service';
import {FormBuilder} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent extends OrderDataComponent implements OnInit {
  @Input() orderId: any;
  @Input() storeId: any;
  packageItems: any = [];
  boxme_oms_url: any;

  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder, private sanitizer: DomSanitizer) {
    super(orderService);
  }

  ngOnInit() {
    this.orderService.get(`package-item/${this.orderId}`, undefined).subscribe(res => {
      this.packageItems = res.data;
      console.log(this.packageItems);
    });
    if (this.storeId === 1) {
      this.boxme_oms_url = 'https://boxme.asia/vi/trackntrace/';
    } else if (this.storeId === 7) {
      this.boxme_oms_url = 'https://boxme.asia/id/trackntrace/';
    }
  }
  isEmpty(value) {
    return typeof value === 'undefined' || value === '' || value === null;
  }
  getBoxmeOmsUrl(bmCode?: any) {
    if (this.boxme_oms_url !== this.jsVoid && !this.isEmpty(bmCode)) {
      this.boxme_oms_url += '?tracking_number=' + bmCode;
      return this.sanitizer.bypassSecurityTrustUrl(this.boxme_oms_url);
    }
    return this.sanitizer.bypassSecurityTrustUrl(this.jsVoid);
  }

}
