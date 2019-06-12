import { Component, OnInit } from '@angular/core';
import {OrderService} from '../order/order.service';
import {PopupService} from '../../core/service/popup.service';
import {FormBuilder, FormGroup} from '@angular/forms';
// import {OrderDataComponent} from '../order/order-data.component';
import {MoreLogService} from './more-log.service';
import {NotificationsService} from '../../core/service/notifications.service';
import {OperationDataComponent} from '../operation-data.component';

@Component({
  selector: 'app-more-log',
  templateUrl: './more-log.component.html',
  styleUrls: ['./more-log.component.css']
})
export class MoreLogComponent extends OperationDataComponent implements OnInit {
  public limit = 20;
  public page = 1;
  public moreLogs: any = [];
  public bsRangeValue: Date[];
  public total: number;
  public type: 'action';
  public formSearch: FormGroup;
  constructor(private moreLogService: MoreLogService,
              private popup: PopupService,
              public  notifi: NotificationsService,
              private fb: FormBuilder) {
    super(moreLogService);
  }

  ngOnInit() {
    this.buildForm();
    this.listMoreLog();
  }
  buildForm() {
    this.formSearch = this.fb.group({
      valueOrderCode: '',
      valueEmployees: '',
      valueCreate: '0',
      content: '',
      ip: '',
      bsRangeValue: {start: '', end: ''},
      type: 'actionlog'
    });
  }
  valueFormSearch() {
    const value = this.formSearch.value;
    const params: any = {};
    if (value.valueOrderCode !== '') {
      params.ordercode = value.valueOrderCode;
    }
    if (value.valueEmployees !== '') {
      params.user_name = value.valueEmployees;
    }
    if (value.content !== '') {
      params.content = value.content;
    }
    if (value.type !== '') {
      params.type = value.type;
    }
    if (value.ip !== '') {
      params.ip = value.ip;
    }
    if (value.valueCreate !== '') {
      params.valueCreate = value.valueCreate;
    }
    if (value.bsRangeValue.length > 0 && value.bsRangeValue !== 'ALL') {
      params.startTime = this.convertDateTime(value.bsRangeValue['0']);
      params.endTime = this.convertDateTime(value.bsRangeValue['1']);
    }
    params.limit = this.limit;
    params.page = this.page;
    return params;
  }
  convertDateTime(value) {
    const date = new Date(value);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    const mySQLDate = [date.getFullYear(), month, day].join('/');
    const mySQLTime = [hours, minutes, seconds].join(':');
    return [mySQLDate, mySQLTime].join(' ');
  }
  listMoreLog() {
    const params = this.valueFormSearch();
    this.moreLogService.searchMoreLog(params.type, params).subscribe(res => {
      this.moreLogs = res.data.model;
      this.total = res.data.totalCount;
    });
  }

  handlePagination(event) {
    this.page = event.page;
    this.listMoreLog();
  }

  handlePerPage(event) {
    this.limit = event.target.value;
    this.listMoreLog();
  }
  freshMoreLog() {
    this.buildForm();
    this.listMoreLog();
  }
}
