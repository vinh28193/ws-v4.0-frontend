import {Component, Input, OnInit} from '@angular/core';
import {OrderDataComponent} from '../../../order-data.component';
import {OrderService} from '../../../order.service';
import {PopupService} from '../../../../../core/service/popup.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-package-item',
  templateUrl: './edit-package-item.component.html',
  styleUrls: ['./edit-package-item.component.css']
})
export class EditPackageItemComponent extends OrderDataComponent implements OnInit {
  @Input() package: any;
  formGroup: FormGroup;

  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
    super(orderService);
  }

  ngOnInit() {
    this.build();
  }
  build() {
    this.editForm = this.fb.group({
      package_code: this.package.package_code,
      quantity: this.package.quantity,
      weight: this.package.weight,
      dimension_l: this.package.dimension_l,
      dimension_w: this.package.dimension_w,
      dimension_h: this.package.dimension_h,
    });
  }

  preparPackage() {
    const value = this.editForm.value;
    const params: any = {};
    if (value.package_code !== '') {
      params.package_code = value.package_code;
    }
    if (value.box_me_warehouse_tag !== '') {
      params.quantity = value.quantity;
    }
    if (value.weight !== '') {
      params.weight = value.weight;
    }
    if (value.dimension_l !== '') {
      params.dimension_l = value.dimension_l;
    }
    if (value.dimension_w !== '') {
      params.dimension_w = value.dimension_w;
    }
    if (value.dimension_h !== '') {
      params.dimension_h = value.dimension_h;
    }
    console.log(this.editForm.value);
    return params;
  }

  updatePackage() {
    const params = this.preparPackage();
    console.log(params);
    this.orderService.put(`package-item/${this.package.id}`, params).subscribe(res => {
      if (res.success) {
        this.popup.success(res.message);
      } else {
        this.popup.error(res.message);
      }
    });
  }

}
