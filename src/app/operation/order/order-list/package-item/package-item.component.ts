import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../../order.service';
import {PopupService} from '../../../../core/service/popup.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OrderDataComponent} from '../../order-data.component';

@Component({
  selector: 'app-package-item',
  templateUrl: './package-item.component.html',
  styleUrls: ['./package-item.component.css']
})
export class PackageItemComponent extends OrderDataComponent implements OnInit {
  @Input() packages: any;
  @Input() orderCode: any;
  public package: any;
  public check: boolean = false;
  public checkCreate: boolean = false;
  public createForm: FormGroup;

  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
    super(orderService);
  }

  ngOnInit() {
    this.buildCreate();
  }

  packageEdit(item) {
    this.package = item;
    this.check = true;
  }
  offEditPackage() {
    this.check = false;
  }
  offCreatePackage() {
    this.checkCreate = false;
  }

  addPackageItem() {
    const params = this.preparPackagesss();
    this.orderService.post('package-item', params).subscribe(res => {
      const rs: any = res;
      if (rs.success) {
        this.popup.success(rs.message);
      } else {
        this.popup.error(rs.message);
      }
    });
  }

  buildCreate() {
    this.createForm = this.fb.group({
      package_code: '',
      quantity: '',
      price: '',
      weight: '',
      change_weight: '',
      dimension_l: '',
      dimension_w: '',
      dimension_h: '',
      box_me_warehouse_tag: ''
    });
  }

  preparPackagesss() {
    const value = this.createForm.value;
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
    if (value.price !== '') {
      params.price = value.price;
    }
    if (value.change_weight !== '') {
      params.change_weight = value.change_weight;
    }
    if (value.box_me_warehouse_tag !== '') {
      params.box_me_warehouse_tag = value.box_me_warehouse_tag;
    }
    if (this.orderCode !== '') {
      params.ordercode = this.orderCode;
    }
    return params;
  }
}
