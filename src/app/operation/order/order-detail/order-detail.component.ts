import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderDataComponent} from '../order-data.component';
import {OrderService} from '../order.service';
import {PopupService} from '../../../core/service/popup.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ScopeService} from '../../../core/service/scope.service';
import {NotifierService} from 'angular-notifier';
import {forEach} from '@angular/router/src/utils/collection';
import {toNumber} from 'ngx-bootstrap/timepicker/timepicker.utils';

declare var $: any;

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent extends OrderDataComponent implements OnInit {
  private tabs: any [];
  public openEditVariant = {};
  public pricePro = {};
  public packingWW = {};
  public openEditCategory = {};
  public openEditNoteByCustomer = {};
  updateProductId: any;
  productQ: any;
  public code: any;
  public checkOpen = false;
  id: any;
  idEdit = 0;
  fee = 0;
  oldfee = 0;
  public totalAmount = 0;
  public proId: any;
  public hidem: any = {};
  public surcharge: any = {};
  public tax: any = {};
  public custom: any = {};
  public quantityPro: any = {};
  @Input() openConfirmOrder: boolean;
  @Input() products: any;
  @Input() exchangeRate: any;
  @Input() policy: any;
  @Input() item_type: any;
  @Input() customer_id: any;
  @Input() Employee_Purchase: any;
  @Input() storeID: any;
  @Input() order_path: any;
  public price_amount_origin: any;
  public policyPrice: any;
  public shipping_quantity: any;
  public shipping_fee: any;
  public tax_fee: any;
  public custom_fee: any;
  public checkUpdatePricePro = false;
  public checkUpdateSurcharge = false;
  public checkUpdateCustomFee = false;
  public checkUpdateTax = false;
  public checkUpdateShipping = false;
  public checkUpdateWood = false;
  public checkUpdateQuantity = false;
  public editFormVariant: FormGroup;
  public updateForm: FormGroup;
  public editFormNote: FormGroup;
  @Output() editFee: EventEmitter<any> = new EventEmitter<any>();
  @Output() getListOrder: EventEmitter<any> = new EventEmitter<any>();
  @Output() addTrackingCode: EventEmitter<any> = new EventEmitter<any>();
  private notifier: NotifierService;
  private $j: number;

  constructor(private orderService: OrderService,
              private popup: PopupService,
              private fb: FormBuilder,
              public _sp: ScopeService,
              notifier: NotifierService
  ) {
    super(orderService);
    this.notifier = notifier;
  }

  ngOnInit() {
    this.tabs = [
      {id: 'purchase', title: 'Purchase Info', router: '/purchase'},
      {id: 'package', title: 'Package Info', router: 'detail-package-item'},
      {id: 'shipment', title: 'Delivery Info', router: '/shipment'},
      {id: 'payment', title: 'Refund/Addfee', router: '/return-addfee'}
    ];
  }

  showEditFee(ProFee) {
    this.idEdit = ProFee.id;
    this.fee = ProFee.local_amount;
    this.oldfee = ProFee.local_amount;
    this.updateProductId = ProFee.product_id;
  }

  keydownEvent($event) {
    if ($event.keyCode === 27) {
      this.idEdit = 0;
      this.fee = 0;
      this.updateProductId = 0;
    } else if ($event.keyCode === 13) {
      console.log('id ' + this.idEdit);
      console.log('fee ' + this.fee);
      const params: any = {};
      params.fee = this.fee;
      // if (this.oldfee === this.fee) {
      //     console.log('Không có thay đổi phí');
      //     this.idEdit = 0;
      //     this.fee = 0;
      //     this.updateProductId = 0;
      // } else {
      //     const prodFee = this.setFeeChange();
      this.orderService.put(`fee/${this.idEdit}`, params).subscribe(rs => {
        const res: any = rs;
        if (res.success) {
          console.log('Cập nhật thành công!');
          this.editFee.emit(true);
        } else {
          // prodFee.local_amount = this.oldfee;
          this.editFee.emit(true);
          this.popup.error(res.message);
        }
        this.idEdit = 0;
        this.fee = 0;
        this.updateProductId = 0;
      });
      // }
    }
  }

  setFeeChange() {
    let proFee;
    for (let ind = 0; ind < this.products.length; ind++) {
      if (this.products[ind].id === this.updateProductId) {
        if (this.products[ind].productFees) {
          for (let indx = 0; indx < this.products[ind].productFees.length; indx++) {
            if (this.products[ind].productFees[indx].id === this.idEdit) {
              this.products[ind].productFees[indx].local_amount = this.fee;
              this.products[ind].productFees[indx].amount = this.fee / 23500;
              proFee = this.products[ind].productFees[indx];
            }
          }
        }
      }
    }
    return proFee;
  }

  getTotalProductFee(fee) {
    let totalPro = 0;
    if (fee.length > 0) {
      for (let i = 0; i < fee.length; i++) {
        if (fee[i]['local_amount'] === undefined) {
          fee[i]['local_amount'] = 0;
        }
        totalPro += fee[i]['local_amount'];
        return totalPro;
      }
    }
  }

  getProFee(fee, cusId) {
    console.log(cusId);
    if (fee === 'custom_fee' && cusId === null) {
      return false;
    }
    return true;
  }

  checkShowEdit(type) {
    return (type !== 'product_price' && type !== 'tax_fee' && type !== 'origin_shipping');
  }

  checkClass(type) {
    if (type !== 'product_price' && type !== 'tax_fee' && type !== 'shipping_fee') {
      return 2;
    }
  }

  checkShowFee(name) {
    if (name === 'purchase_fee'
      || name === 'international_shipping_fee'
      || name === 'import_fee'
     || name === 'product_price') {
      return true;
    }
  }

  clickUpdateVarian(variant, id) {
    this.id = id;
    this.editFormVariant = this.fb.group({
      variant: variant,
      order_path: this.order_path,
      title: 'Variant'
    });
  }

  editVariantPro() {
    this.orderService.put(`product/${this.id}`, this.editFormVariant.value).subscribe(res => {
      if (res.success) {
        this.editFee.emit(true);
      }
    });
  }

  updateCategory(id) {
    const params = this.buildform();
    this.orderService.put(`product/${id}`, params).subscribe(res => {
      if (res.success) {
        this.checkOpen = false;
        this.editFee.emit(true);
        $('.modal').modal('hide');
      }
    });
  }

  clickOpen(pro, code) {
    this.checkOpen = true;
    console.log(code);
    this.code = code;
    this.id = pro.id;
    this.updateForm = this.fb.group({
      policy_id: pro.custom_category_id,
      note_boxme: pro.note_boxme,
    });
    this.editFormNote = this.fb.group({
      noteCustomer: pro.note_by_customer
    });
  }

  buildform() {
    const value = this.updateForm.value;
    const params: any = {};
    if (value.policy_id !== '') {
      params.policy_id = value.policy_id;
    }
    if (value.note_boxme !== '') {
      params.note_boxme = value.note_boxme;
    }
    params.order_path = this.code;
    params.title = 'category policy';
    return params;
  }

  offModal() {
    this.checkOpen = false;
    $('.modal').modal('hide');
  }

  // policyName(id) {
  //   const ud = undefined;
  //   if (id === null || id === '' || typeof id === undefined) {
  //     return ud;
  //   }
  //   const policyName = this.policy.filter(c => Number(c.id) === Number(id));
  //   if (policyName.length > 0) {
  //     return policyName[0].name;
  //   }
  //
  //   return ud;
  // }

  buildformNote() {
    const value = this.editFormNote.value;
    const params: any = {};
    if (value.noteCustomer !== '') {
      params.noteCustomer = value.noteCustomer;
    }
    params.order_path = this.code;
    params.title = 'note by customer';
    return params;
  }

  editNotePro(id) {
    const params = this.buildformNote();
    this.orderService.put(`product/${id}`, params).subscribe(res => {
      if (res.success) {
        this.checkOpen = false;
        this.editFee.emit(true);
        $('.modal').modal('hide');
      }
    });
  }

  confirmOrder(product) {
    this.popup.warning(() => {
      const put = {
        product_id: product.id,
        OrderScenario: 'confirmPurchase'
      };
      this.orderService.put(`order/${product.order_id}`, put).subscribe(res => {
        if (res.success) {
          this.getListOrder.emit({});
          this.popup.success(res.message);
        } else {
          this.popup.error(res.message);
        }
      });
    }, 'Do you want confirm purchase product id ' + product.id);
  }

  itemSubtotal(productFees) {
    let total = 0;
    for (let j = 0; j < productFees.length; j++) {
      if (productFees[j]['name'] === 'product_price') {
        // console.log(productFees[j]['amount']);
        total += Number(productFees[j]['local_amount']);
      }
      if (productFees[j]['name'] === 'shipping_fee') {
        total += Number(productFees[j]['local_amount']);
      }
      if (productFees[j]['name'] === 'tax_fee') {
        total += Number(productFees[j]['local_amount']);
      }
    }
    return total;
  }

  itemSubtotalAmount(productFees) {
    let tottalAmount = 0;
    for (let j = 0; j < productFees.length; j++) {
      if (productFees[j]['name'] === 'product_price') {
        // console.log(productFees[j]['amount']);
        tottalAmount += Number(productFees[j]['amount']);
      }
      if (productFees[j]['name'] === 'shipping_fee') {
        tottalAmount += Number(productFees[j]['amount']);
      }
      if (productFees[j]['name'] === 'tax_fee') {
        tottalAmount += Number(productFees[j]['amount']);
      }
    }
    return tottalAmount;
  }

  confirmChangePrice(product) {
    this.popup.warning(() => {
      const put = {
        product_id: product.id,
        order_id: product.order_id
      };
      this.orderService.post(`order-s/confirm-change-price`, put).subscribe(res => {
        const rs: any = res;
        if (rs.success) {
          this.getListOrder.emit({});
          this.popup.success(rs.message);
        } else {
          this.popup.error(rs.message);
        }
      });
    }, 'Do you want confirm changing price product id ' + product.id);
  }

  openUpdatePricePro(price, id, qtt) {
    this.price_amount_origin = price;
    this.shipping_quantity = qtt;
    this.checkUpdatePricePro = true;
    this.proId = id;
  }
  openUpdateQuantity(quantity, id, price ) {
    this.shipping_quantity = quantity;
    this.price_amount_origin = price;
    this.proId = id;
    this.checkUpdateQuantity = true;
  }

  updatePricePro() {
    const params: any = {};
    params.us_amount = this.price_amount_origin;
    params.shipping_quantity = this.shipping_quantity;
    params.target_name = 'product';
    params.target_id = this.proId;
    params.store_id = this.storeID;
    params.us_ship = this.shipping_fee;
    params.custom_fee = this.custom_fee;
    params.us_tax = this.tax_fee;
    params.item_type = this.item_type;
    params.customer_id = this.customer_id;
    this.orderService.getAdditional(params).subscribe(res => {
      this.getListOrder.emit({});
    });
  }
  openUpdatePackingWood(pro) {
    this.policyPrice = pro.price_policy;
    this.id = pro.id;
    this.checkUpdateWood = true;
  }

  openUpdateSurcharge(pro) {
    this.policyPrice = pro.price_policy;
    this.id = pro.id;
    this.checkUpdateSurcharge = true;
  }
  updatePricePolicy() {
    const params: any = {};
    params.policyPrice = this.policyPrice;
    params.order_path = this.order_path;
    params.title = 'update price policy';
    const paramsList: any = {};
    paramsList.target_name = 'product';
    paramsList.target_id = this.id;
    paramsList.store_id = this.storeID;
    this.orderService.put(`product/${this.id}`, params).subscribe(res => {
        if (res.success) {
          this.orderService.getAdditional(paramsList).subscribe(rs => {
            this.getListOrder.emit({});
          });
        }
    });
  }
  openUpdateShipping(product, fee) {
    this.checkUpdateShipping = true;
    this.proId = product.id;
    this.shipping_fee = fee;
    this.shipping_quantity = product.quantity;
  }
  openUpdateTaxFee(product, fee) {
    this.checkUpdateTax = true;
    this.proId = product.id;
    this.tax_fee = fee;
    this.shipping_quantity = product.quantity;
  }

  openUpdateCustomFee(product, fee) {
    this.checkUpdateCustomFee = true;
    this.proId = product.id;
    this.custom_fee = fee;
    this.shipping_quantity = product.quantity;
  }
}
