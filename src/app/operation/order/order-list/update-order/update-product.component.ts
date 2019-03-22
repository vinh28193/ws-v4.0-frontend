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
  @Input() updateProductId: any;
  @Input() product: any;
  public formGroup: FormGroup;

  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
    super(orderService);
  }
  orders: any = [];

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.formGroup = this.fb.group({
      skuChange: [this.product.sku, Validators.required],
      parent_sku: [this.product.parent_sku, Validators.required],
      variations: [this.product.variations],
      portal: [this.product.portal, Validators.required],
      note: [this.product.note_by_customer, Validators.required],
    });
  }

  update() {
    const params = this.formGroup.value;
    this.orderService.putProduct(this.updateProductId, params).subscribe(res =>{
      if (res.message === 'Success') {
        this.popup.success(res.message);
      }
      this.popup.error(res.message);
    });
  }

}
