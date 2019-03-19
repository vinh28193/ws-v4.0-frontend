import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OrderDataComponent} from '../order-data.component';
import {OrderService} from '../order.service';
import {BsDaterangepickerConfig} from 'ngx-bootstrap';
import {PopupService} from '../../../core/service/popup.service';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css']
})
export class OrderListComponent extends OrderDataComponent implements OnInit {
  public orders: any = [];
  public total: any;
  public pageCount: number;
  public currentPage: number;
  public perPage: number;
  public dateTime: Date;
  // form Group
  public searchForm: FormGroup;
  itemStatus: any = [];
  searchKeys: any = [];
  timeKeys: any = [];
  public bsRangeValue: Date[];
  paymentRequests: any = [];
  public filter: any = {};
  public status: any;
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
    this.listOrder();
    this.searchKeys = [
      {key: 'order_item.id', name: 'SOI'},
      {key: 'order.binCode', name: 'BIN'},
      {key: 'order_item.sku', name: 'SKU'},
      {key: 'order_item_trackingcode.trackingCode', name: 'Tracking Code'},
      {key: 'order.couponCode', name: 'Coupon Code'},
      {key: 'order.paymentToken', name: 'Payment Token'},
      {key: 'order_item.purchaseTransactionCode', name: 'PO Transaction Code'},
      {key: 'order_item.purchaseOrderId', name: 'PO'},
      {key: 'order_item.itemCategoryId', name: 'Category Id'},
      {key: 'order_item.Name', name: 'Product Name'},
      {key: 'order.buyerEmail', name: 'Email'},
      {key: 'order.buyerPhone', name: 'Phone'},
      {key: 'order.customerId', name: 'CustomerId'},
      {key: 'order.paymentMethod', name: 'Payment Method'},
    ];
    this.timeKeys = [
      {key: 'order.createTime', name: 'Created Time'},
      {key: 'order_item.supportStartTime', name: 'Support Start'},
      {key: 'order_item.supportCompleteTime', name: 'Support Complete'},
      {key: 'order_item.purchaseCompleteTime', name: 'PurchaseTime'},
      {key: 'order.LastPaidTime', name: 'Payment Time'},
      {key: 'order_item.exportWarehouseStockInTime', name: 'US StockIn'},
      {key: 'order_item.exportWarehouseInpalletTime', name: 'US packing box'},
      {key: 'order_item.exportWarehouseStockOutTime', name: 'Us StockOut'},
      {key: 'order_item.localWarehouseStockinTime', name: 'Local Stockin'},
      {key: 'order_item.localWarehouseStockoutTime', name: 'Local Stockout'},
      {key: 'order_item.customerDeliveryTime', name: 'At Customer Time'},
      {key: 'order_payment.addfee', name: 'Addfee Create Time'},
      {key: 'order_payment.addfee.paid', name: 'Addfee Paid Time'},
      {key: 'order_payment.refund', name: 'Refund Create Time'},
      {key: 'order_payment.refund.paid', name: 'Refund Paid Time'},
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
  }

  listOrder() {
    const params = this.prepareSearch();
    this.orderService.search(params).subscribe(response => {
      const result: any = response;
      if (result.message === 'ok') {
        // this.popup.success(result.message);
        const data: any = result.data;
        this.orders = data._items;
        // console.log(' data Order : ' + JSON.stringify(this.orders));
        this.orders = Object.entries(data._items).map(e => {
          return e[1];
        });
        this.total = data._meta.totalCount;
        this.pageCount = data._meta.pageCount;
        this.currentPage = data._meta.currentPage;
        this.perPage = data._meta.perPage;
      } else {
        this.popup.error(result.message);
      }
    });
  }
  quantityOrder(quantityC, quantityL) {
    let quantityA = 0;
    for (let i = 0; i < quantityL ; i++) {
      quantityA += quantityC[i]['quantity_customer'];
    }
    return quantityA;
  }
    buildSearchForm() {
        this.searchForm = this.fb.group({
            store: this.allKey,
            paymentStatus: this.allKey,
            keyWord: this.allKey,
            keyCategory: this.allKey,
            timeKey: this.allKey,
            timeRange: '',
            type: this.allKey,
            portal: this.allKey,
            status: this.allKey,
            location: this.allKey,
            sale: this.allKey
        });
    }
  prepareSearch() {
    const value = this.searchForm.value;
    console.log(this.searchForm);
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
    if (value.keyCategory !== '' && value.keyCategory !== 'ALL') {
      params.keyCategory = value.keyCategory;
    }
    if (value.type !== '' && value.type !== 'ALL') {
      params.type = value.type;
    }
    if (value.portal !== '' && value.portal !== 'ALL') {
      params.portal = value.portal;
    }
    if (value.status !== '' && value.status !== 'ALL') {
      params.status = value.status;
    }
    if (value.location !== '' && value.location !== 'ALL') {
      params.location = value.location;
    }
    if (value.sale !== '' && value.sale !== 'ALL') {
      params.sale = value.sale;
    }
    if (value.timeKey !== '' && value.timeKey !== 'ALL') {
      params.timeKey = value.timeKey;
    }
    if (value.timeRange.length > 0 && (value.timeRange[0] !== '' || value.timeRange[1] !== '')) {

    }
    params.limit = this.perPage;
    params.page = this.currentPage;
    return params;
  }

  handlePagination(event) {
    console.log(event)
    const page = event.page;
    this.searchForm.patchValue({page: page});
    this.listOrder();
  }

  handlePerPage(event) {
    const value = event.target.value;
    this.searchForm.patchValue({perPage: value});
    this.listOrder();
  }
}
