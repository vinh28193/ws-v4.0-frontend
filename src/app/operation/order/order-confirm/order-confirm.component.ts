import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderDataComponent} from '../order-data.component';
import {OrderService} from '../order.service';
import {PopupService} from '../../../core/service/popup.service';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css']
})
export class OrderConfirmComponent extends OrderDataComponent implements OnInit, DoCheck {

  @Input() order: any = {};
  @Output() close = new EventEmitter();

  public orderUpdateLog: any = {};

  public packing_wood = 'N';

  public inspection = 'N';

  public insurance = 'N';

  public oldOrderCode;

  private couriers;

  private _totalConfirmAmount;
  private _packingWoodAmount;
  private _inspectionAmount;
  private _insuranceAmount;
  private _internationalAmount;


  constructor(public http: OrderService, private popup: PopupService) {
    super(http);
  }

  ngOnInit() {

  }

  ngDoCheck() {
    if (this.order.ordercode !== this.oldOrderCode) {
      this.loadOrderUpdateLog();
      this.packing_wood = 'N';
      this.inspection = 'N';
      this.insurance = 'N';
      this.insuranceAmount = 0;
      this.inspectionAmount = 0;
      this.internationalAmount = 0;
      this.oldOrderCode = this.order.ordercode;
    }
  }

  public loadOrderUpdateLog() {
    this.http.get(`additional/${this.order.ordercode}`, undefined).subscribe(res => {
      if (res.data) {
        this.orderUpdateLog = res.data.diff_value;
      }
    });
  }

  public get totalConfirmAmount(): any {
    return this._totalConfirmAmount;
  }

  public set totalConfirmAmount($amount: any) {
    this._totalConfirmAmount = $amount;
  }

  public get packingWoodAmount(): any {
    return this._packingWoodAmount;
  }

  public set packingWoodAmount(amount) {
    this._packingWoodAmount = amount;
  }

  public get inspectionAmount(): any {
    if (this.inspection === 'Y') {
      this._inspectionAmount = 1.5 * this.order.products.length;
    }
    return this._inspectionAmount;
  }

  public set inspectionAmount($amount: any) {
    this._inspectionAmount = $amount;
  }

  public get insuranceAmount(): any {
    return this._insuranceAmount;
  }

  public set insuranceAmount($amount: any) {
    this._insuranceAmount = $amount;
  }

  public get internationalAmount(): any {
    return this._internationalAmount;
  }

  public set internationalAmount(amount: any) {
    this._internationalAmount = amount;
  }

  public getCalcInsurance() {
    const params: any = {};
    params.target_name = 'order';
    params.target_id = this.order.ordercode;
    params.store_id = this.order.store_id;
    params.accept_insurance = this.insurance;
    this.http.post('additional', params).subscribe(rs => {
      const res: any = rs;
      if (res.success) {
        const fees = res.data.additional_fees;
        if (typeof fees['insurance_fee'] !== 'undefined') {
          const insuranceFee = fees['insurance_fee'];
          let local_amount = 0;
          for (let i = 0; i < insuranceFee.length; i++) {
            local_amount += insuranceFee[i].local_amount;
          }
          this.insuranceAmount = local_amount;

        }
      }
    });
  }

  acceptUsedInsurance() {
    this.insurance = this.insurance === 'N' ? 'Y' : 'N';
    this.insuranceAmount = 0;
    if (this.insurance === 'Y') {
      this.getCalcInsurance();
    }

  }

  acceptInspection() {
    this.inspection = this.inspection === 'N' ? 'Y' : 'N';
    if (this.inspection === 'N') {
      this.inspectionAmount = 0;
    }

  }

  canRefreshFee() {
    return !(this.order.total_intl_shipping_fee_local !== null && Number(this.order.total_intl_shipping_fee_local) > 0);
  }

  calc($params, callback) {
    this.http.post('additional', $params).subscribe(rs => {
      const res: any = rs;
      if (res.success) {
        callback(res.data);
        const fees = res.data.additional_fees;
        this.couriers = res.data.couriers[0] || {};
        if (typeof fees['international_shipping_fee'] !== 'undefined') {
          const intFee = fees['international_shipping_fee'];
          let local_amount = 0;
          for (let i = 0; i < intFee.length; i++) {
            local_amount += Number(intFee[i].local_amount);
          }
          this.internationalAmount = local_amount;
        }
      }
    });
  }

  getCalcInternationalShipping() {
    const params: any = {};
    params.target_name = 'order';
    params.target_id = this.order.ordercode;
    params.store_id = this.order.store_id;
    this.http.post('additional', params).subscribe(rs => {
      const res: any = rs;
      if (res.success) {
        const fees = res.data.additional_fees;
        this.couriers = res.data.couriers[0] || {};
        if (typeof fees['international_shipping_fee'] !== 'undefined') {
          const intFee = fees['international_shipping_fee'];
          let local_amount = 0;
          for (let i = 0; i < intFee.length; i++) {
            local_amount += Number(intFee[i].local_amount);
          }
          this.internationalAmount = local_amount;
        }
      }
    });
  }

  confirmOption() {
    const params: any = {};
    params.insurance = this.insuranceAmount;
    params.inspection = this.inspectionAmount;
    params.packingWood = this.packingWoodAmount;
    if (this.canRefreshFee()) {
      params.international = this.internationalAmount;
      params.courier = JSON.stringify(this.couriers);
    }

    const messagePop = 'Do you want Confirm order ' + this.order.id;
    this.popup.warning(() => {
      this.http.put(`order/${this.order.ordercode}/confirm`, params).subscribe(res => {
        const rs: any = res;
        if (rs.success) {
          this.offOption();
          this.popup.success(rs.message);
        } else {
          this.popup.error(rs.message);
        }
      });
    }, messagePop);
  }

  offOption() {
    this.close.emit(true);
  }
}
