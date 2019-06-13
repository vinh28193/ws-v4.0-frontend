import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderService} from '../../order.service';
import {PopupService} from '../../../../core/service/popup.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OrderDataComponent} from '../../order-data.component';
import {StatusOrder} from '../../order-enum';
import {ScopeService} from '../../../../core/service/scope.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent extends OrderDataComponent implements OnInit {
  public ShoppingCar: any = [];
  public statusOrder: any = [];
  public getPolicyCart: any = [];
  public activeOrder: any = [];
  public listLog: any = [];
  public bsRangeValue: Date[];
  public metaShopping: any = {};
  public hideme: any = {};
  public pro: any = {};
  public moreLog: any = {};
  public searchF: FormGroup;
  public perpage: number;
  public totalCart: number;
  public totalCarts: any;
  public IdCar: any;
  public id: any;
  public type: any;
  public typeCart: any;
  public status: any;
  public typeViewLogs = 'actionlog';
  public code: any;
  public backorderlist = false;
  public checkUpdateCustomer = false;
  public checkLoad = false;
  public checkLoadGroup = false;
  public limit: number = 20;
  public page: number = 1;
  @Input() listSaleAll: any = [];
  @Output() backOrder = new EventEmitter();
  public formEditCustomer: FormGroup;
  public logIdOrder: any;
  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder, public __scope: ScopeService, public  notifi: NotifierService) {
    super(orderService);
  }

  ngOnInit() {
    this.statusOrder = StatusOrder;
    this.searchF = this.fb.group({
      value: '',
      keyword: 0,
      timeKey: 0,
      bsRangeValue: {start: '', end: ''},
    });
    this.listShoppingCart();
  }
  listShoppingCart() {
    const params = this.pSearch();
    params.limit = this.limit;
    params.page = this.page;
    this.orderService.ListShopping(params).subscribe(res => {
      this.ShoppingCar = res.data.allModels._items;
      this.totalCarts = res.data.allModels.count;
      this.totalCart = this.totalCarts[0]['sum'];
      this.metaShopping = res.data._meta;
      if (this.totalCart >= this.limit) {
        this.perpage = Math.floor(this.totalCart / this.limit) + 1;
      } else {
        this.perpage = 1;
      }
    });
  }

  getChangeAmount(price1, price2) {
    return price1 - price2;
  }

  handlePagination(event) {
    this.page = event.page;
    this.listShoppingCart();
  }

  handlePerPage(event) {
    this.limit = event.target.value;
    this.listShoppingCart();
  }

  pSearch() {
    const value = this.searchF.value;
    const params: any = {};
    if (value.value !== '') {
      params.value = value.value;
    }
    if (value.keyword !== '' && value.keyword !== 0) {
      params.keyword = value.keyword;
    }
    if (value.bsRangeValue.length > 0 && value.bsRangeValue !== 'ALL') {
      params.startTime = this.convertDateTime(value.bsRangeValue['0']);
      params.endTime = this.convertDateTime(value.bsRangeValue['1']);
    }
    return params;
  }
  backOrderShopping() {
    this.backorderlist = true;
    this.backOrder.emit(this.backorderlist);
  }

  filterOneCustomer(email) {
    this.searchF.patchValue({
      value: email,
      keyword: 'data.order.customer.email'
    });
    this.listShoppingCart();
  }
  refreshShopping() {
    this.searchF.patchValue({
      value: '',
      keyword: 0
    });
    this.listShoppingCart();
  }
  cancelOrderCart(id, type) {
    const params: any = {};
    params.type = type;
    params.typeUpdate = 'cancelCart';
    this.orderService.put(`cart/${id}`, params).subscribe( res => {
        if (res.success) {
          this.listShoppingCart();
          this.popup.success(res.message);
        } else {
          this.popup.error(res.message);
        }
    });
  }
  confirmOrderCart(id, type) {
    const params: any = {};
    params.type = type;
    params.typeUpdate = 'confirmOrderCart';
    this.orderService.put(`cart/${id}`, params).subscribe( res => {
      if (res.success) {
        this.listShoppingCart();
        this.popup.success(res.message);
      } else {
        this.popup.error(res.message);
      }
    });
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
  loadListSale(event) {
    if (event) {
      this.listShoppingCart();
    }
  }

  markAsJunkShopping(id, type) {
    const messagePop = 'Do you want Mark As Junk order ' + id;
    this.popup.warning(() => {
      const params: any = {};
      params.type = type;
      params.typeUpdate = 'markAsJunk';
      this.orderService.put(`cart/${id}`, params).subscribe(res => {
        if (res.success) {
          this.listShoppingCart();
          this.popup.success(res.message);
        } else {
          this.popup.error(res.message);
        }
      });
    }, messagePop);
  }
  chatCart(code, status, type, id) {
    this.code = code;
    this.IdCar = id;
    this.status = status;
    this.typeCart = type;
    this.checkLoad = true;
  }

  chatGroupCart(code, status, type, id) {
    this.code = code;
    this.IdCar = id;
    this.status = status;
    this.typeCart = type;
    this.checkLoadGroup = true;
  }
  offModeChat() {
    this.checkLoadGroup = false;
    this.checkLoad = false;
  }
  // chatG(id, code, status) {
  //   this.statusO = status;
  //   this.checkLoadG = true;
  //   this.orderIdChat = id;
  //   this.codeG = code;
  // }

  viewMoreLogCart(status, code, type = 'item') {
    this.moreLog.status = status;
    this.logIdOrder = code;
    if (this.typeViewLogs === 'actionlog') {
      this.orderService.get(`${this.typeViewLogs}/${code}`, undefined).subscribe(res => {
        const rs = res;
        this.listLog = rs.data;
      });
    }
  }
}
