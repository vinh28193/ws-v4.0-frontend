import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OrderDataComponent} from '../order-data.component';
import {OrderService} from '../order.service';
import {BsDaterangepickerConfig, ModalOptions} from 'ngx-bootstrap';
import {PopupService} from '../../../core/service/popup.service';
import {ModalDirective} from 'ngx-bootstrap';
import {EventEmitter} from '@angular/core';
import {searchKeys, orderStatus, paymentRequests, timeKeys} from '../order-enum';
import {toNumber} from 'ngx-bootstrap/timepicker/timepicker.utils';
import {AuthService} from '../../../core/service/auth.service';
import {Router} from '@angular/router';

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
    public AdjustPaymentOderId = false;
    public updateOrderId: any;
    public updateOrderPurchaseId: any;
    public listSeller: any = [];
    public listSale: any = [];
    public email: any;
    public sale_support_id: any;
    public productUpdateFee: any;
    public total_paid_amount_local: any;
    // form Group
    public searchForm: FormGroup;
    public editForm: FormGroup;
    public checkOpenAdJustPayment: boolean = false;
    public checkOpenPromotion: boolean = false;
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
    public coupon_id: any;
    constructor(private orderService: OrderService, private router: Router, private popup: PopupService, private fb: FormBuilder, private _authService: AuthService) {
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
        this.searchKeys = searchKeys;
        this.timeKeys = timeKeys;
        this.paymentRequests = paymentRequests;
        this.orderStatus = orderStatus;
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
        this.buildSearchForm();
    }

    viewMoreLog(status, code, type = 'item') {
        this.moreLog.status = status;
        this.logIdOrder = code;
    }

    confirmAll(id) {
        const put = this.orderService.createPostParams({
            current_status: 'SUPPORTED',
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
            keyWord: this.email,
            searchKeyword: 'customer.email'
        });
        this.listOrders();
    }

    filterOneSale(sale_support_id) {
        this.sale_support_id = sale_support_id;
        this.searchForm.patchValue({
            sale: this.sale_support_id,
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

    checkCustomer(item) {
        if (item.length > 0) {
            for (let i = 0; i < item.length; i++) {
                if (item[i]['custom_category_id'] !== '' && item[i]['custom_category_id'] !== null) {
                    return true;
                }
                return false;
            }
        }
        return false;
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
        }
        if (f1 === undefined) {
            f1 = 0;
        }
        if (f2 === undefined) {
            f2 = 0;
        }
        if (f3 === undefined) {
            f3 = 0;
        }
        if (f4 === undefined) {
            f4 = 0;
        }
        if (f4 === undefined) {
            f4 = 0;
        }
        if (f5 === undefined) {
            f5 = 0;
        }
        if (f6 === undefined) {
            f6 = 0;
        }
        if (f7 === undefined) {
            f7 = 0;
        }
        if (f8 === undefined) {
            f8 = 0;
        }
        if (f9 === undefined) {
            f9 = 0;
        }
        if (f10 === undefined) {
            f10 = 0;
        }
        if (f11 === undefined) {
            f11 = 0;
        }
        const totalOrderFee = toNumber(f) + toNumber(f1) + toNumber(f2) + toNumber(f3)
            + toNumber(f4) + toNumber(f5) + toNumber(f6) + toNumber(f7) + toNumber(f8) +
            toNumber(f9) + toNumber(f10) + toNumber(f11);
        return totalOrderFee;
    }

  updateAdjustPayment(id, code, total_paid_amount_local) {
      this.AdjustPaymentOderId = id;
      this.total_paid_amount_local = total_paid_amount_local;
      this.code = code;
      this.checkOpenAdJustPayment = true;
      this.editForm = this.fb.group({
        total_paid_amount_local: this.total_paid_amount_local
      });
  }
  offAdJustPayment() {
      this.checkOpenAdJustPayment = false;
  }
  confirmAdjustPayment() {
    const put = this.orderService.createPostParams({
      total_paid_amount_local: this.editForm.value.total_paid_amount_local
    }, 'editAdjustPayment');
    this.orderService.put(`order/${this.AdjustPaymentOderId}`, put).subscribe(res => {
      if (res.success) {
        this.popup.success(res.message);
      } else {
        this.popup.error(res.message);
      }
    });
  }
  updatePromotion(order) {
      this.coupon_id = order.coupon_id;
      console.log(this.coupon_id);
      this.orderID = order.id;
      this.code = order.ordercode;
      this.checkOpenPromotion = true;
  }

  offPromotion() {
      this.checkOpenPromotion = false;
  }

    getChangeAmount(price1, price2) {
        return price1 - price2;
    }

    checkUpdatenow(order) {
        if (this.checkAdminAccess()) {
            // return true;
        }
        return (order.current_status === 'PURCHASED'
            || order.current_status === 'PURCHASE_PART')
            && (order.purchase_assignee_id === this.identity.id
                || this.checkAdminAccess());
    }

    checkBuynow(order) {
        if (this.checkAdminAccess()) {
            // return true;
        }
        return (order.current_status === 'PURCHASE_PART' ||
            order.current_status === 'READY2PURCHASE' ||
            (order.current_status === 'PURCHASING' &&
                (order.purchase_assignee_id === this.identity.id
                    || this.checkAdminAccess()))
        );
    }
    checkCancel(item) {
      if (item === 'NEW' || item === 'SUPPORTED' || item === 'SUPPORTING') {
        if (localStorage.getItem('scope') === 'superAdmin' || localStorage.getItem('scope') === 'admin' || localStorage.getItem('scope') === 'sale' || localStorage.getItem('scope') === 'warehouse' || localStorage.getItem('scope') === 'master_sale') {
          return true;
        }
      }
    }
}

