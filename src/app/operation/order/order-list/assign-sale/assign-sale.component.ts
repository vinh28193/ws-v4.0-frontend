import {Component, Input, OnInit} from '@angular/core';
import {OrderDataComponent} from '../../order-data.component';
import {OrderService} from '../../order.service';
import {PopupService} from '../../../../core/service/popup.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-assign-sale',
  templateUrl: './assign-sale.component.html',
  styleUrls: ['./assign-sale.component.css']
})
export class AssignSaleComponent extends OrderDataComponent implements OnInit {
  @Input() orderId: any;
  @Input() saleId: any;
  @Input() saleEmail: any;
  @Input() sale: any;

  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
    super(orderService);
  }
  assignSale() {
    const put = this.orderService.createPostParams({
      sale_support_id: this.saleId,
    }, 'saleAssign')
    this.orderService.put(`order/${this.orderId}`, put).subscribe(res => {
      if (res.success) {
        this.popup.success(res.message);
      }
        this.popup.error(res.message);
    });
  }

  ngOnInit() {
  }

}
