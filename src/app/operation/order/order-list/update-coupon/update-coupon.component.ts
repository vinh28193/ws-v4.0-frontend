import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderService} from '../../order.service';
import {PopupService} from '../../../../core/service/popup.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OrderDataComponent} from '../../order-data.component';

@Component({
  selector: 'app-update-coupon',
  templateUrl: './update-coupon.component.html',
  styleUrls: ['./update-coupon.component.css']
})
export class UpdateCouponComponent extends OrderDataComponent implements OnInit {
  @Input() id: any;
  @Input() coupon_id: any;
  @Input() ordercode: any;
  @Output() checkEdit = new EventEmitter();
  formEditCoupon: FormGroup;
  public coupon: any;
  public listCoupon: any = [];
  public checkDisabled: boolean = false;
  public checkLoadAmount: boolean = false;
  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
    super(orderService);
  }

  ngOnInit() {
    if (this.coupon_id) {
      this.checkDisabled = true;
      this.orderService.get(`coupon/${this.coupon_id}`, undefined).subscribe(res => {
        this.coupon = res.data['0'];
      });
      this.formEditCoupon = this.fb.group({
        start_time: '',
        end_time: '',
        name: '',
        code: '',
        limit_amount_use: '',
        limit_amount_use_order: '',
        message: '',
        amount: '',
      });
    } else if (!this.coupon_id) {
      this.orderService.get('coupon', undefined).subscribe(res => {
        this.listCoupon = res.data;
      });
      this.formEditCoupon = this.fb.group({
        couponId: ''
      });
    }
  }

  buildValue() {
    const value = this.formEditCoupon.value;
    const params: any = {};
    if (this.coupon_id) {
      if (value.start_time !== '') {
        params.start_time = value.start_time;
      }
      if (value.end_time !== '') {
        params.end_time = value.end_time;
      }
      if (value.name !== '') {
        params.name = value.name;
      }
      if (value.code !== '') {
        params.code = value.code;
      }
      if (value.limit_amount_use !== '') {
        params.limit_amount_use = value.limit_amount_use;
      }
      if (value.limit_amount_use_order !== '') {
        params.limit_amount_use_order = value.limit_amount_use_order;
      }
      if (value.message !== '') {
        params.message = value.message;
      }
      if (value.amount !== '') {
        params.amount = value.amount;
        console.log(params.amount);
      }
    } if (!this.coupon_id) {
      if (value.couponId !== '') {
        params.couponId = value.couponId;
      }
    }
    params.ordercode = this.ordercode;
    return params;
  }

  updatePromotionOrder() {
    const params = this.buildValue();
    if (this.coupon_id) {
      this.orderService.put(`coupon/${this.coupon_id}`, params).subscribe(res => {
        if (res.success) {
          this.popup.success(res.message);
          this.checkLoadAmount = true;
          this.checkEdit.emit(this.checkLoadAmount);
        } else {
          this.popup.error(res.message);
        }
      });
    } else {
      const put = this.orderService.createPostParams({
        coupon_id: params.couponId
      }, 'updateCouponId');
      this.orderService.put(`order/${this.id}`, put).subscribe(res => {
        if (res.success) {
          this.popup.success(res.message);
          this.checkLoadAmount = true;
          this.checkEdit.emit(this.checkLoadAmount);
        } else {
          this.popup.error(res.message);
        }
      });
    }
  }

}
