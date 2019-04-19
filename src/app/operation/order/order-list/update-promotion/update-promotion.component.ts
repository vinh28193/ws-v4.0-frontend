import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderService} from '../../order.service';
import {PopupService} from '../../../../core/service/popup.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OrderDataComponent} from '../../order-data.component';

@Component({
  selector: 'app-update-promotion',
  templateUrl: './update-promotion.component.html',
  styleUrls: ['./update-promotion.component.css']
})
export class UpdatePromotionComponent extends OrderDataComponent implements OnInit {
  formEditPromotion: FormGroup;
  @Input() id: any;
  @Input() promotion_id: any;
  @Input() ordercode: any;
  @Input() store_id: any;
  @Output() checkEdit = new EventEmitter();
  @Output() checkOff = new EventEmitter();
  public checkDisabled: boolean = false;
  public checkLoadAmount: boolean = false;
  public checkOffModal: boolean = false;
  public listPromotion: any = [];
  public promotion: any = [];
  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
    super(orderService);
  }

  ngOnInit() {
    console.log(this.promotion_id);
    if (this.promotion_id) {
      this.checkDisabled = true;
      this.orderService.get(`promotion/${this.promotion_id}`, undefined).subscribe(res => {
        this.promotion = res.data['0'];
      });
      this.formEditPromotion = this.fb.group({
        conditionStartTime: '',
        conditionEndTime: '',
        name: '',
        code: '',
        discountAmount: '',
        discountOverWeight: '',
        conditionLimitUsageCount: '',
        conditionLimitUsageAmount: '',
        conditionLimitByCustomerUsageCount: '',
        conditionLimitByCustomerUsageAmount: '',
        message: '',
      });
    } else if (!this.promotion_id) {
      this.orderService.get('promotion', undefined).subscribe(res => {
        this.listPromotion = res.data;
      });
      this.formEditPromotion = this.fb.group({
        promotionId: ''
      });
    }
  }

  buildValue() {
    const value = this.formEditPromotion.value;
    const params: any = {};
    if (this.promotion_id) {
      if (value.conditionStartTime !== '') {
        params.conditionStartTime = value.conditionStartTime;
      }
      if (value.conditionEndTime !== '') {
        params.conditionEndTime = value.conditionEndTime;
      }
      if (value.name !== '') {
        params.name = value.name;
      }
      if (value.code !== '') {
        params.code = value.code;
      }
      if (value.discountAmount !== '') {
        params.discountAmount = value.discountAmount;
      }
      if (value.discountOverWeight !== '') {
        params.discountOverWeight = value.discountOverWeight;
      }
      if (value.message !== '') {
        params.message = value.message;
      }
      if (value.conditionLimitUsageCount !== '') {
        params.conditionLimitUsageCount = value.conditionLimitUsageCount;
      }
      if (value.conditionLimitUsageAmount !== '') {
        params.conditionLimitUsageAmount = value.conditionLimitUsageAmount;
      }
      if (value.conditionLimitByCustomerUsageCount !== '') {
        params.conditionLimitByCustomerUsageCount = value.conditionLimitByCustomerUsageCount;
      }
      if (value.conditionLimitByCustomerUsageAmount !== '') {
        params.conditionLimitByCustomerUsageAmount = value.conditionLimitByCustomerUsageAmount;
      }
    } if (!this.promotion_id) {
      if (value.promotionId !== '') {
        params.promotionId = value.promotionId;
      }
    }
    params.ordercode = this.ordercode;
    return params;
  }
  clickOff() {
    this.checkOffModal = true;
    this.checkOff.emit(this.checkOffModal);
  }
  updatePromotionOrder() {
    const params = this.buildValue();
    if (this.promotion_id) {
      this.orderService.put(`promotion/${this.promotion_id}`, params).subscribe(res => {
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
        promotion_id: params.promotionId
      }, 'updatePromotionId');
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
