import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OperationDataComponent} from '../../../operation-data.component';
import {OrderDataComponent} from '../../order-data.component';
import {OrderService} from '../../order.service';
import {PopupService} from '../../../../core/service/popup.service';
import {ScopeService} from '../../../../core/service/scope.service';

@Component({
  selector: 'app-edit-local',
  templateUrl: './edit-local.component.html',
  styleUrls: ['./edit-local.component.css']
})
export class EditLocalComponent extends OrderDataComponent implements OnInit {
  @Input() product: any;
  @Input() store_id: any;
  @Input() order_path: any;
  @Output() CheckLoad = new EventEmitter();
  public updateForm: FormGroup;
  public pro: any = {};
  public code: any;
  public checkOpen = false;

  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder , public global: ScopeService) {
    super(orderService);
  }

  ngOnInit() {
    console.log(this.order_path);
  }
  updateCategory() {
    const params = this.buildform();
      this.orderService.put(`product/${this.product.id}`, params).subscribe(res => {
        if (res.success) {
          this.CheckLoad.emit(true);
        }
      });
    }
  clickOpen() {
    // console.log(code);
    // this.code = code;
    this.checkOpen = true;
    this.updateForm = this.fb.group({
      policy_id: this.product.custom_category_id,
    });
  }
  buildform() {
    const value = this.updateForm.value;
    const params: any = {};
    if (value.policy_id !== '') {
      params.policy_id = value.policy_id;
    }
    params.order_path = this.code;
    params.title = 'category policy';
    return params;
  }
  offModal() {
    this.checkOpen = false;
  }
}
