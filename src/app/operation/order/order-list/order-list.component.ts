import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OrderDataComponent} from '../order-data.component';
import {OrderService} from '../order.service';
import {BsDaterangepickerConfig} from 'ngx-bootstrap';
import {PopupService} from '../../../core/service/popup.service';
import {ModalDirective} from 'ngx-bootstrap';
import {EventEmitter} from '@angular/core';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css']
})
export class OrderListComponent extends OrderDataComponent implements OnInit {
    // @ViewChild(ModalDirective) purchaseCard: ModalDirective;
    // @ViewChild(ModalDirective) showChat: ModalDirective;
    // @ViewChild(ModalDirective) showChatGroup: ModalDirective;
    public orders: any = [];
    public total: any;
    public dateTime: Date;
    public orderIdChat: any;
    public code: any;
    public checkLoad = false;
    public checkLoadG = false;
    public updateOrderId: any;
    public updateOrderCode: any;
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
    productQ: any;
    public moreLog: any = {};
    public ids: any = [];
    public orderID: any;
    public typeViewLogs = 'all';

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
            {key: 'product.id', name: 'SOI'},
            {key: 'product.sku', name: 'SKU'},
            {key: 'coupon.code', name: 'Coupon Code'},
            {key: 'product.category_id', name: 'Category Id'},
            {key: 'product.product_name', name: 'Product Name'},
            {key: 'customer.email1', name: 'Buy Email'},
            {key: 'order.receiver_phone', name: 'Receiver Email'},
            {key: 'order.receiver_email', name: 'Receiver Email'},
            {key: 'customer.phone1', name: 'Phone'},
            {key: 'order.payment_type', name: 'Payment Type'},
        ];
        this.timeKeys = [
            {key: 'order.created_at', name: 'Created Time'},
            {key: 'order.updated_at', name: 'Update Time'},
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
            params.value = value.keyWord;
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
        if (value.timeKey !== '' && value.timeKey !== 'ALL') {
            params.timeKey = value.timeKey;
        }
        if (value.bsRangeValue.length > 0 && value.bsRangeValue !== 'ALL') {
            params.startTime = this.convertDateTime(value.bsRangeValue['0']);
            params.endTime = this.convertDateTime(value.bsRangeValue['1']);
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

    followOrder() {
        this.checkF = !this.checkF;
    }

    chat(id, code) {
        this.checkLoad = true;
        this.orderIdChat = id;
        this.code = code;
    }

    chatG(id) {
        this.checkLoadG = true;
        this.orderIdChat = id;
    }

    clickOff() {
        this.checkLoad = false;
    }

    clickOffG() {
        this.checkLoadG = false;
    }

    openUpdateOrder(id) {
        this.updateProductId = id;
    }

    viewMoreLog(status, orders, type = 'item') {
        this.moreLog.status = status;
        this.moreLog.order = orders;
        for (let i = 0; i < orders.length; i++) {
            this.ids[i] = orders[i]['id'];
        }
        this.moreLog.orderID = this.ids;
        this.moreLog.type = type;
        console.log(this.moreLog);
    }

    viewMoreLogg(event) {
        this.moreLog.level = 'Support';
        this.moreLog.note = '';
        this.typeViewLogs = 'support_logs';
        this.moreLog.ItemIds = event.ItemIds;
        if (event.type === 'item' && (this.moreLog.id !== event.item.id || !this.moreLog.data)) {
            this.moreLog.id = event.item.id;
            this.moreLog.orderId = event.item.orderId;
            this.moreLog.status = event.status;
            this.moreLog.data = {};
        } else if (event.type === 'order') {
            this.moreLog.id = null;
            this.moreLog.orderId = event.item.id;
            this.moreLog.status = event.status;
            this.moreLog.data = {};
        }
    }

    confirmAll(products) {
        console.log(products);
    }

    markAsJunk(productsId) {
    }
}

