import { Component, OnInit } from '@angular/core';
import {OperationDataComponent} from '../operation-data.component';
import {PopupService} from '../../core/service/popup.service';
import {FormBuilder, FormGroup} from '@angular/forms';
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
  public exChangeRate = {
    from: '',
    to: '',
    rate: ''
  }
  constructor(public http: OperationService, private fb: FormBuilder, public popup: PopupService) {
    super(http);
  }

  ngOnInit() {
    this.ListExchangeRate();
  }
  ListExchangeRate() {
    this.http.get('ex', undefined).subscribe(res => {
      this.list = res.data;
    });
  }
  updateEx() {
    this.http.put(`ex/${this.id}`, this.exChangeRate).subscribe(res => {
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
    this.exChangeRate.from = ex.from;
    this.exChangeRate.to = ex.to;
    this.exChangeRate.rate = ex.rate;
  }
}
