import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
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
  @Input() orderC: any;
  @Output() checkEdit = new EventEmitter();
  public  checkLoadPackage: boolean = false;
  public editForm: FormGroup;

  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
    super(orderService);
  }

  ngOnInit() {
    this.buildEdit();
  }
  buildEdit() {
    this.editForm = this.fb.group({
      tracking_code: this.package.tracking_code,
      quantity: this.package.quantity,
      weight: this.package.weight,
      dimension_l: this.package.dimension_l,
      dimension_w: this.package.dimension_w,
      dimension_h: this.package.dimension_h,
    });
  }

  preparPackages() {
    const value = this.editForm.value;
    const params: any = {};
    if (value.tracking_code !== '') {
      params.tracking_code = value.tracking_code;
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
    if (this.orderC !== '') {
      params.ordercode = this.orderC;
    }
    console.log(this.editForm.value);
    return params;
  }

  updatePackage() {
    const params = this.preparPackages();
    console.log(params);
    this.orderService.put(`draft-package-item/${this.package.id}`, params).subscribe(res => {
      if (res.success) {
        this.popup.success(res.message);
        this.checkLoadPackage = true;
        this.checkEdit.emit(this.checkLoadPackage);
      } else {
        this.popup.error(res.message);
      }
    });
  }

}
