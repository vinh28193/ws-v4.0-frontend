import {Component, Input, OnInit} from '@angular/core';
import {OrderDataComponent} from '../../order-data.component';
import {OrderService} from '../../order.service';
import {PopupService} from '../../../../core/service/popup.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent extends OrderDataComponent implements OnInit {
  @Input() orderUpdatePurchase: any;
  public formGroup: FormGroup;
  public checkS: boolean = false;

  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
    super(orderService);
  }
  clickCheckShow() {
    this.checkS = !this.checkS;
  }

  ngOnInit() {
  }
  loadHistory() {
  }

}
