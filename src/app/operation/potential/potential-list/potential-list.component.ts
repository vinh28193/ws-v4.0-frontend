import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OrderDataComponent} from '../../order/order-data.component';
import {PopupService} from '../../../core/service/popup.service';
import {PotentialService} from '../potential.service';
import {toNumber} from 'ngx-bootstrap/timepicker/timepicker.utils';

@Component({
  selector: 'app-potential-list',
  templateUrl: './potential-list.component.html',
  styleUrls: ['./potential-list.component.css']
})
export class PotentialListComponent extends OrderDataComponent implements OnInit {
  public ShoppingCar: any = [];
  public statusOrder: any = [];
  public getPolicyCart: any = [];
  public activeOrder: any = [];
  public OrderAllCart: any = [];
  public listLog: any = [];
  public listSale: any = [];
  public bsRangeValue: Date[];
  public metaShopping: any = {};
  public hideme: any = {};
  public pro: any = {};
  public dvct1: any = {};
  public moreLog: any = {};
  public searchF: FormGroup;
  public perpage: number;
  public totalCart: number;
  public totalCarts: any;
  public typeUpdate: any;
  public IdCar: any;
  public id: any;
  public type: any;
  public status: any;
  public typeCart: any;
  public typeViewLogs = 'actionlog';
  public code: any;
  public backorderlist = false;
  public checkUpdateCustomerCart = false;
  public checkUpdateCustomerReceiverCart = false;
  public checkUpdateCustomer = false;
  public checkLoad = false;
  public checkLoadGroup = false;
  public checkUpdateConfirmCart = false;
  public limit: number = 20;
  public page: number = 1;
  @Input() listSaleAll: any = [];
  @Output() backOrder = new EventEmitter();
  public formEditCustomer: FormGroup;
  public logIdOrder: any;
  public total_inspection_fee_local: any;
  checkShoppingCart: any;
  constructor(public potentialService: PotentialService, private popup: PopupService, private fb: FormBuilder) {
    super(potentialService);
  }

  ngOnInit() {
    console.log(this.listSaleAll);
    this.searchF = this.fb.group({
      value: '',
      keyword: 0,
      timeKey: 0,
      portal: 0,
      saleID: 0,
      potential: 10,
      statusShopping: 0,
      bsRangeValue: {start: '', end: ''},
    });
    this.listShoppingCart();
    this.getSale();
  }
  listShoppingCart() {
    const params = this.pSearch();
    params.limit = this.limit;
    params.page = this.page;
    params.potential = 1;
    this.potentialService.ListShopping(params).subscribe(res => {
      this.ShoppingCar = res.data.allModels._items;
      console.log(this.ShoppingCar);
      this.totalCarts = res.data.allModels.count[0]['sum'];
      // this.totalCart = this.totalCarts[0]['sum'];
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

  loadData(tab, id) {
    if (tab !== this.typeViewLogs) {
      this.potentialService.get(`${tab}/${id}`, undefined).subscribe(res => {
        const rs = res;
        this.listLog = rs.data;
      });
    }
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
    if (value.timeKey !== '' && value.timeKey !== 0) {
      params.timeKey = value.timeKey;
    }
    if (value.statusShopping !== '' && value.statusShopping !== 0) {
      params.statusShopping = value.statusShopping;
    }
    if (value.portal !== '' && value.portal !== 0) {
      params.portal = value.portal;
    }
    if (value.saleID !== '' && value.saleID !== 0) {
      params.saleID = value.saleID;
    }
    if (value.potential !== '' && value.potential !== 10) {
      params.potential = value.potential;
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
      keyword: 'key.buyer.buyer_email'
    });
    this.listShoppingCart();
  }
  refreshShopping() {
    this.searchF.patchValue({
      value: '',
      keyword: 0,
      timeKey: 0,
      portal: 0,
      potential: 10,
      statusShopping: 0,
      bsRangeValue: {start: '', end: ''},
    });
    this.listShoppingCart();
  }
  cancelOrderCart(id, type) {
    const params: any = {};
    params.type = type;
    params.typeUpdate = 'cancelCart';
    this.potentialService.put(`cart/${id}`, params).subscribe( res => {
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
    this.potentialService.put(`cart/${id}`, params).subscribe( res => {
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
      this.potentialService.put(`cart/${id}`, params).subscribe(res => {
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
    console.log(code);
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

  viewMoreLogCart(status, code) {
    this.moreLog.status = status;
    this.logIdOrder = code;
    if (this.typeViewLogs === 'actionlog') {
      this.potentialService.get(`${this.typeViewLogs}/${code}`, undefined).subscribe(res => {
        const rs = res;
        this.listLog = rs.data;
      });
    }
  }

  getSale() {
    this.potentialService.get('sale-support', undefined).subscribe(rss => {
      this.listSale = rss;
      console.log(this.listSale);
    });
  }
  openConfirmCart(order) {
    console.log(order);
    this.checkUpdateConfirmCart = true;
    this.OrderAllCart = order;

  }

  totalNumberAnyCart(x , y, z , g , d, e) {
    const c = toNumber(x) + toNumber(y) + toNumber(z) + toNumber(g) + toNumber(d) + toNumber(e);
    return c;
  }
  checkSpAdmin() {
    if (localStorage.getItem('scope') === 'superAdmin') {
      return true;
    } else {
      return false;
    }
  }

  updateCustomerCart(buyer, code, type) {
    this.checkUpdateCustomerCart = true;
    this.activeOrder = buyer;
    this.typeCart = type;
    this.typeUpdate = 'updateBuyerCart';
    this.code = code;
  }
  updateCustomerReveiverCart(receiver, code, type) {
    this.checkUpdateCustomerReceiverCart = true;
    this.activeOrder = receiver;
    this.typeCart = type;
    this.typeUpdate = 'updateReceiverCart';
    this.code = code;
    console.log(code);
  }
}
