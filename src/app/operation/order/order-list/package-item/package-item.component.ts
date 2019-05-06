import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderService} from '../../order.service';
import {PopupService} from '../../../../core/service/popup.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrderDataComponent} from '../../order-data.component';
import {ModalDirective} from 'ngx-bootstrap';
declare var $: any;
@Component({
  selector: 'app-package-item',
  templateUrl: './package-item.component.html',
  styleUrls: ['./package-item.component.css']
})
export class PackageItemComponent extends OrderDataComponent implements OnInit {
  public packages: any = [];
  @Input() orderCode: any;
  @Input() orderIDD: any;
  @Input() products: any;
  @Output() packageI = new EventEmitter();
  public package: any;
  public check: boolean = false;
  public checkCreate: boolean = false;
  public checkLoadPackage: boolean = false;
  public createForm: FormGroup;

  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
    super(orderService);
  }

  ngOnInit() {
    this.buildCreate();
    this.listPackageItem();
    console.log(this.products);
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

  listPackageItem() {
    this.orderService.get(`p/${this.orderIDD}`, undefined).subscribe(res => {
      this.packages = res.data;
      this.packageI.emit(this.packages);
    });
  }

  addPackageItem() {
    const params = this.preparPackagesss();
    this.orderService.post('p', params).subscribe(res => {
      const rs: any = res;
      if (rs.success) {
        this.popup.success(rs.message);
        this.buildCreate();
        this.listPackageItem();
        $('.modal').modal('hide');
      } else {
        this.popup.error(rs.message);
      }
    });
  }

  buildCreate() {
    this.createForm = this.fb.group({
      product_id: [this.products[0]['id'], Validators.required],
      quantity: '',
      price: '',
      weight: '',
      dimension_l: '',
      dimension_w: '',
      dimension_h: '',
      tracking_code: ''
    });
  }

  preparPackagesss() {
    const value = this.createForm.value;
    const params: any = {};
    if (value.product_id !== '') {
      params.product_id = value.product_id;
    }
    if (value.tracking_code !== '') {
      params.tracking_code = value.tracking_code;
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
    if (value.quantity !== '') {
      params.quantity = value.quantity;
    }
    if (value.change_weight !== '') {
      params.change_weight = value.change_weight;
    }
    params.box_me_warehouse_tag = value.box_me_warehouse_tag;
    if (this.orderCode !== '') {
      params.ordercode = this.orderCode;
    }
    params.order_id = this.orderIDD;
    return params;
  }

  handleChange(event) {
    this.checkLoadPackage = event;
    if (this.checkLoadPackage = true) {
      $('.modal').modal('hide');
      this.listPackageItem();
    }
  }

  RemovePackage(id) {
    const messagePop = 'delete pakage ' + id ;
    this.popup.warning(() =>  {
      this.orderService.delete(`p/${id}`).subscribe(res => {
        if (res.success) {
          this.popup.success(res.message);
          this.listPackageItem();
        } else {
          this.popup.error(res.message);
        }
      });
    }, messagePop);
  }
}
