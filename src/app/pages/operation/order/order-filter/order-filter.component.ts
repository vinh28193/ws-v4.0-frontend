import { Component, OnInit } from '@angular/core';
import {moment} from 'ngx-bootstrap/chronos/test/chain';

@Component({
  selector: 'app-order-filter',
  templateUrl: './order-filter.component.html',
  styleUrls: ['./order-filter.component.css']
})
export class OrderFilterComponent implements OnInit {
  filter: any = {};
  itemStatus = [];
  searchKeys = [];
  timeKeys = [];
  paymentRequests = [];
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  constructor() { }

  ngOnInit() {
    this.filter = {
      filterCategory: 'search',
      orderType: '0',
      itemType: '',
      itemStatus: '',
      sale: '',
      paymentRequest: '',
      location: '',
      approveStatus: '',
      policyId: '',
      searchKeyword: {key: 'all', value: ''},
      extractTime: {timeKey: 'all', timeValue: {start: '', end: ''}},
      paymentStatus: '',
      store: '',
    };
    this.itemStatus = [
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
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
  public onChangeDate(event) {
    this.bsRangeValue = event;
    const item: any = {};
    item.start = this.convertDateTime(event[0]);
    item.end = this.convertDateTime(event[1]);
    this.filter.extractTime.timeValue = item;
    // this.onSearch();
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
}
