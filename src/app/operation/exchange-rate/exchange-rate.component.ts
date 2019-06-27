import { Component, OnInit } from '@angular/core';
import {OperationDataComponent} from '../operation-data.component';
import {OrderService} from '../order/order.service';
import {PopupService} from '../../core/service/popup.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {OperationService} from '../operation.service';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent extends OperationDataComponent implements OnInit {
  public updateFormEx: FormGroup;
  public list: any = [];
  public id: any;
  public checkEX = false;
  constructor(public http: OperationService, private fb: FormBuilder, public popup: PopupService) {
    super(http);
  }

  ngOnInit() {
    this.ListExchangeRate();
  }
  ListExchangeRate() {
    this.http.get('ex', undefined).subscribe(res => {
      this.list = res.data;
      console.log(res.data);
    });
  }
  updateEx() {
    const params = this.buildForm();
    this.http.put(`ex/${this.id}`, params).subscribe(res => {
      if (res.success) {
          this.popup.success(res.success);
      } else {
        this.popup.error('Update Exchange rate error');
      }
    });
  }
  openUpdateEx(ex) {
    this.id = ex.id;
    console.log(this.id);
    this.checkEX = true;
    this.updateFormEx = this.fb.group({
      from: ex.from,
      to: ex.to,
      rate: ex.rate,
    });
  }
  buildForm() {
    const value = this.updateFormEx.value;
    const params: any = {};
    if (value.from !== '') {
      params.from = value.from;
    }
    if (value.to !== '') {
      params.to = value.to;
    }
    if (value.rate !== '') {
      params.rate = value.rate;
    }
    return params;
  }
}
