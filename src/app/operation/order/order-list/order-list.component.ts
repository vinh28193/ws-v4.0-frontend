import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OrderDataComponent} from '../order-data.component';
import {OrderService} from '../order.service';
import {BsDaterangepickerConfig, ModalOptions} from 'ngx-bootstrap';
import {PopupService} from '../../../core/service/popup.service';
import {ModalDirective} from 'ngx-bootstrap';
import {EventEmitter} from '@angular/core';
import {toNumber} from 'ngx-bootstrap/timepicker/timepicker.utils';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent extends OrderDataComponent implements OnInit {
  @ViewChild(ModalDirective) showChat: ModalDirective;
  @ViewChild(ModalDirective) showChatGroup: ModalDirective;
  public orders: any = [];
  public total: any;
  public dateTime: Date;
  public orderIdChat: any;
  public code: any;
  public codeG: any;
  public checkLoad = false;
  public checkLoadG = false;
  public updateOrderId: any;
  public updateOrderPurchaseId: any;
  public listSeller: any = [];
  public listSale: any = [];
  public email: any;
  public sale_support_id: any;
  public productUpdateFee: any;
  // form Group
  public searchForm: FormGroup;
  orderStatus: any = [];
  searchKeys: any = [];
  timeKeys: any = [];
  products: any;
  public bsRangeValue: Date[];
  paymentRequests: any = [];
  public filter: any = {};
  public status: any;
  public checkF = false;
  updateProductId: any;
  public orderUpdatePurchase: any;
  public moreLog: any = {};
  public ids: any = [];
  public orderID: any;
  public typeViewLogs = 'all';
  public listLog: any = [];
  public logIdOrder: any;

  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
    super(orderService);
  }

  ngOnInit() {
    this.currentPage = 1;
    this.perPage = 20;
    this.dateTime = new Date();
    const maxDateTime: Date = this.dateTime;
    maxDateTime.setDate(this.dateTime.getDate() + 1);
    this.bsRangeValue = [this.dateTime, maxDateTime];
    this.buildSearchForm();
    this.listOrders();
    this.searchKeys = [
      {key: 'order.ordercode', name: 'BIN'},
      {key: 'product.id', name: 'SOI'},
      {key: 'product.sku', name: 'SKU'},
      {key: 'coupon.code', name: 'Coupon Code'},
      {key: 'product.category_id', name: 'Category Id'},
      {key: 'product.product_name', name: 'Product Name'},
      {key: 'customer.email1', name: 'Buy Email'},
      {key: 'order.receiver_email', name: 'Receiver Email'},
      {key: 'order.receiver_phone', name: 'Phone receiver'},
      {key: 'customer.phone1', name: 'Phone buyers'},
      {key: 'order.payment_type', name: 'Payment Type'},
    ];
    this.timeKeys = [
      {key: 'order.new', name: 'New'},
      {key: 'order.purchased', name: 'Purchased'},
      {key: 'order.seller_shipped', name: 'Seller Shipped'},
      {key: 'order.stockin_us', name: 'StockIn US'},
      {key: 'order.stockout_us', name: 'StockOut US'},
      {key: 'order.stockin_local', name: 'StockIn Local'},
      {key: 'order.stockout_local', name: 'StockOut Local'},
      {key: 'order.at_customer', name: 'At Customer'},
      {key: 'order.returned', name: 'Return'},
      {key: 'order.cancelled', name: 'Cancelled'},
      {key: 'order.lost', name: 'Lost'}
    ];
    this.paymentRequests = [
      {key: 'order.createTime', name: 'New Add fee'},
      {key: 'order.createTime', name: 'Aproved Add fee'},
      {key: 'order.createTime', name: 'Addffee Requested'},
      {key: 'order.createTime', name: 'Not Has Refund'},
      {key: 'order.createTime', name: 'New Refund'},
      {key: 'order.createTime', name: 'Aproved Refund'},
      {key: 'order.createTime', name: 'Refund Requested'},
      {key: 'order.createTime', name: 'Refund/Addfee success'},
      {key: 'order.createTime', name: 'Refund/Addfee Fail'},
    ];
    this.orderStatus = [
      {key: 'NEW', name: 'New order'},
      {key: 'SUPPORTING', name: 'Supporting'},
      {key: 'SUPPORTED', name: 'Supported'},
      {key: 'READY2PURCHASE', name: 'Ready purchase'},
      {key: 'PURCHASING', name: 'Purchasing'},
      {key: 'PURCHASE_PENDING', name: 'Purchase pending'},
      {key: 'PURCHASED', name: 'Purchased'},
      {key: 'EXPWH_STOCKOUT', name: 'US warehouse'},
      {key: 'IMPWH_STOCKIN', name: 'Local warehouse'},
      {key: 'CUSTOMER_RECEIVED', name: 'Success order'},
      {key: 'REFUNDED', name: 'Refunded order'},
      {key: 'CANCEL', name: 'Cancel order'},
      {key: 'REPLACED', name: 'Replaced order'},
      {key: 'JUNK', name: 'Junk'},
      {key: 'PAYMENT_EXPIRED', name: 'Payment Expired'},
      {key: '', name: 'SanBox'}
    ];
    this.load();
  }

  listOrders() {
    const params = this.prepareSearch();
    this.orderService.search(params).subscribe(response => {
      const result: any = response;
      if (result.message === 'Success') {
        // this.popup.success(result.message);
        const data: any = result.data;
        this.orders = data._items;
        // console.log(' data Order : ' + JSON.stringify(this.orders));
        this.orders = Object.entries(data._items).map(e => {
          return e[1];
        });
        this.totalCount = data.totalCount;
        this.pageCount = data.pageCount;
        this.currentPage = data.page;
        this.perPage = data.size;
      } else {
        this.popup.error(result.message);
      }
    });
  }

  quantityOrder(quantityC, quantityL) {
    let quantityA = 0;
    for (let i = 0; i < quantityL; i++) {
      quantityA += quantityC[i]['quantity_customer'];
    }
    return quantityA;
  }

  buildSearchForm() {
    this.searchForm = this.fb.group({
      store: this.allKey,
      paymentStatus: this.allKey,
      keyWord: '',
      searchKeyword: this.allKey,
      timeKey: this.allKey,
      timeRange: '',
      timeKeyCreate: this.allKey,
      valueCreate: {startDate: '', endDate: ''},
      type: this.allKey,
      orderStatus: this.allKey,
      portal: this.allKey,
      location: this.allKey,
      page: this.currentPage,
      perPage: this.perPage,
      sale: this.allKey,
      seller: this.allKey,
      bsRangeValue: {start: '', end: ''}
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

  prepareSearch() {
    const value = this.searchForm.value;
    const params: any = {};
    if (value.store !== '' && value.store !== 'ALL') {
      params.store = value.store;
    }
    if (value.paymentStatus !== '' && value.paymentStatus !== 'ALL') {
      params.paymentStatus = value.paymentStatus;
    }
    if (value.keyWord !== '' && value.keyWord !== 'ALL') {
      params.keyWord = value.keyWord;
    }
    if (value.searchKeyword !== '' && value.searchKeyword !== 'ALL') {
      params.searchKeyword = value.searchKeyword;
    }
    if (value.type !== '' && value.type !== 'ALL') {
      params.type = value.type;
    }
    if (value.orderStatus !== '' && value.orderStatus !== 'ALL') {
      params.orderStatus = value.orderStatus;
    }
    if (value.portal !== '' && value.portal !== 'ALL') {
      params.portal = value.portal;
    }
    if (value.location !== '' && value.location !== 'ALL') {
      params.location = value.location;
    }
    if (value.sale !== '' && value.sale !== 'ALL') {
      params.sale = value.sale;
    }
    if (value.seller !== '' && value.seller !== 'ALL') {
      params.seller = value.seller;
    }
    if (value.timeKey !== '' && value.timeKey !== 'ALL') {
      params.timeKey = value.timeKey;
    }
    if (value.timeKeyCreate !== '' && value.timeKeyCreate !== 'ALL') {
      params.timeKeyCreate = value.timeKeyCreate;
    }
    if (value.bsRangeValue.length > 0 && value.bsRangeValue !== 'ALL') {
      params.startTime = this.convertDateTime(value.bsRangeValue['0']);
      params.endTime = this.convertDateTime(value.bsRangeValue['1']);
    }
    if (value.valueCreate.length > 0 && value.valueCreate !== 'ALL') {
      params.startDate = this.convertDateTime(value.valueCreate['0']);
      params.endDate = this.convertDateTime(value.valueCreate['1']);
    }

    params.limit = 20;
    params.page = 1;
    return params;
  }

  handlePagination(event) {
    const page = event.page;
    this.searchForm.patchValue({page: page});
    this.listOrders();
  }

    handlePerPage(event) {
        const value = event.target.value;
        this.searchForm.patchValue({perPage: value});
        this.listOrders();
    }

    load() {
        this.getSale();
        this.getSeller();
    }

  followOrder() {
    this.checkF = !this.checkF;
  }

  chat(id, code) {
    this.checkLoad = true;
    this.orderIdChat = id;
    this.code = code;
  }

  chatG(id, code) {
    this.checkLoadG = true;
    this.orderIdChat = id;
    this.codeG = code;
  }

  offModeChat() {
    this.checkLoadG = false;
    this.checkLoad = false;
  }

  openUpdateOrder(order) {
    this.orderUpdatePurchase = order;
    this.updateOrderPurchaseId = order.id;
  }

  viewMoreLog(status, id, type = 'item') {
    this.moreLog.status = status;
    this.logIdOrder = id;
  }

  confirmAll(id) {
    const put = this.orderService.createPostParams({
      current_status: 'READY_PURCHASE',
    }, 'confirmPurchase');
    this.orderService.put(`order/${id}`, put).subscribe(res => {
      if (res.success) {
        this.popup.success(res.message);
      } else {
        this.popup.error(res.message);
      }
    });
  }

  markAsJunk(productsId) {
  }

  getSeller() {
    this.orderService.get('seller', undefined).subscribe(rs => {
      this.listSeller = rs.data;
    });
  }

  getSale() {
    this.orderService.get('sale-support', undefined).subscribe(rss => {
      this.listSale = rss;
    });
  }
  filterOneCustome(email) {
    this.email = email;
    this.searchForm.patchValue({
      keyWord : this.email,
      searchKeyword : 'customer.email'
    });
    this.listOrders();
  }
  filterOneSale(sale_support_id) {
    this.sale_support_id = sale_support_id;
    this.searchForm.patchValue({
      sale : this.sale_support_id,
    });
    this.listOrders();
  }

  loadData(tab, id: number) {
    this.orderService.get(`${tab}/${id}`, undefined).subscribe(res => {
      const rs = res;
      this.listLog = rs.data;
      console.log(this.listLog);
    });
  }

  cancelOrder(id) {
    const put = this.orderService.createPostParams({
      current_status: 'CANCEL',
    }, 'updateStatus');
    this.orderService.put(`order/${id}`, put).subscribe(res => {
      if (res.success) {
        this.popup.success(res.message);
      } else {
        this.popup.error(res.message);
      }
    });
  }

  getTotalOrderFee(f, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11) {
   if (f === undefined) {
     f = 0;
   } if (f1 === undefined) {
    f1 = 0;
  } if (f2 === undefined) {
    f2 = 0;
  } if (f3 === undefined) {
    f3 = 0;
  } if (f4 === undefined) {
    f4 = 0;
  } if (f4 === undefined) {
    f4 = 0;
  } if (f5 === undefined) {
    f5 = 0;
  } if (f6 === undefined) {
    f6 = 0;
  } if (f7 === undefined) {
    f7 = 0;
  } if (f8 === undefined) {
    f8 = 0;
  } if (f9 === undefined) {
    f9 = 0;
  }if (f10 === undefined) {
    f10 = 0;
  } if (f11 === undefined) {
    f11 = 0;
  }
  const totalOrderFee = toNumber(f) + toNumber(f1) + toNumber(f2) + toNumber(f3)
    + toNumber(f4) + toNumber(f5) + toNumber(f6) + toNumber(f7) + toNumber(f8) +
    toNumber(f9) + toNumber(f10) + toNumber(f11);
    return totalOrderFee;
  }

}

