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
import {ScopeService} from '../../../core/service/scope.service';

declare var jQuery: any;
declare var $: any;

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css']
})
export class OrderListComponent extends OrderDataComponent implements OnInit {
    @ViewChild('showPromotion') showPromotion: ModalDirective;
    @ViewChild(ModalDirective) showChatGroup: ModalDirective;
    public pro: any = {};
    public pack: any = {};
    public pay: any = {};
    public pur: any = {};
    public click_pur: any = {};
    public orders: any = [];
    public total: any;
    public statusO: any;
    public totalUnPaid: any;
    public countPurchase: any;
    public purchase2Day: any;
    public noTrackingCount: any;
    public purchase: any;
    public stockin_us: any;
    public countUS: any;
    public dateTime: Date;
    public orderIdChat: any;
    public code: any;
    public totalOrder: any;
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
    public hideme: any = {};
    public statusShow: any = {};
    public total_paid_amount_local: any;
    public purchase_amount_refund: any;
    public purchase_amount_buck: any;
    public total_refund_amount_local: any;
    // form Group
    public searchForm: FormGroup;
    public editForm: FormGroup;
    public chatSupporting: FormGroup;
    public checkOpenAdJustPayment = false;
    public checkOpenPromotion = false;
    public checkOpenPayBack = false;
    public checkSellerRefund = false;
    public checkOpenCoupon = false;
    public checkOrderChatRefund = false;
    orderStatus: any = [];
    searchKeys: any = [];
    timeKeys: any = [];
    products: any;
    provinces: any = [];
    public bsRangeValue: Date[];
    paymentRequests: any = [];
    public filter: any = {};
    public status: any;
    public checkF = false;
    public store_id: any;
    public message1: any;
    public markID: any;
    public orderUpdatePurchase: any;
    public moreLog: any = {};
    public ids: any = [];
    public orderID: any;
    public typeViewLogs = 'actionlog';
    public listLog: any = [];
    public logIdOrder: any;
    public coupon_id: any;
    public promotion_id: any;
    public activeOrder: any = [];
    public checkUpdateCustomer = false;
    public CheeckLoadPromotions = false;
    public chatlists: any = [];
    constructor(private orderService: OrderService,
                private router: Router,
                private popup: PopupService,
                private fb: FormBuilder,
                private _authService: AuthService,
                public _scope: ScopeService,
                ) {
        super(orderService);
    }

    ngOnInit() {
        this.currentPage = 1;
        this.perPage = 20;
        this.dateTime = new Date();
        this.buildChat();
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

    buildChat() {
    this.chatSupporting = this.fb.group({
      messageSupporting: '',
    });
    }
    createChatSupporting() {
    const value = this.chatSupporting.value;
    const params: any = {};
    if (value !== '') {
        params.content = value.messageSupporting;
        params.content = params.content.replace(/\n/g, '</br>');
    }
    // console.log(params);
     this.orderService.post(`chatlists`, params).subscribe(res => {
         this.buildChat();
         this.listChatsSupporting();
     });
    }
    deleteChatSupporting(position) {
         this.orderService.delete('chatlists/'+position).subscribe(res => {
         this.listChatsSupporting();
     });
    }
    loadChatSupporting() {
        this.listChatsSupporting();
    }
    listChatsSupporting() {
      this.orderService.get(`chatlists`, 1).subscribe(res => {
      const result1: any = res;
      this.chatlists = result1.data;
      console.log(this.chatlists) ;

    });
    }
    listOrders() {
        const params = this.prepareSearch();
        this.orderService.search(params).subscribe(response => {
            const result: any = response;
            if (result.message === 'Success') {
                // this.popup.success(result.message);
                const data: any = result.data;
                this.orders = data._items;
                this.totalOrder = data._meta.totalCount;
                // console.log(' data Order : ' + JSON.stringify(this.orders));
                this.orders = Object.entries(data._items).map(e => {
                    return e[1];
                });
                this.totalUnPaid = data._summary.totalUnPaid;
                this.countPurchase = data._summary.countPurchase;
                this.purchase2Day = data._summary.countPC;
                this.stockin_us = data._summary.countStockin;
                this.noTrackingCount = data._summary.noTracking;
                this.countUS = data._summary.countUS;
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
    freshOrder() {
      this.buildSearchForm();
      this.listOrders();
    }

    buildSearchForm() {
        this.searchForm = this.fb.group({
            store: this.allKey,
            policy: this.allKey,
            keyWord: '',
            searchKeyword: this.allKey,
            timeKey: this.allKey,
            timeRange: '',
            type: this.allKey,
            orderStatus: this.allKey,
            noTracking: this.allKey,
            portal: this.allKey,
            paymentRequest: this.allKey,
            page: this.currentPage,
            perPage: this.perPage,
            sale: this.allKey,
            paymentStatus: this.allKey,
            bsRangeValue: {start: '', end: ''}
        });
    }

    updateCustomer(order) {
        this.checkUpdateCustomer = true;
        this.activeOrder = order;
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
        if (value.policy !== '' && value.policy !== 'ALL') {
            params.policy = value.policy;
        }
        if (value.keyWord !== '' && value.keyWord !== 'ALL') {
            params.keyWord = value.keyWord;
        }
        if (value.searchKeyword !== '') {
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
        if (value.paymentRequest !== '' && value.paymentRequest !== 'ALL') {
            params.paymentRequest = value.paymentRequest;
        }
        if (value.sale !== '' && value.sale !== 'ALL') {
            params.sale = value.sale;
        }
        if (value.paymentStatus !== '' && value.paymentStatus !== 'ALL') {
            params.paymentStatus = value.paymentStatus;
        }
        // if (value.seller !== '' && value.seller !== 'ALL') {
        //     params.seller = value.seller;
        // }
        if (value.noTracking !== '' && value.noTracking !== 'ALL') {
          params.noTracking = value.noTracking;
        }
        if (value.timeKey !== '') {
            params.timeKey = value.timeKey;
        }
        if (value.bsRangeValue.length > 0 && value.bsRangeValue !== 'ALL') {
            params.startTime = this.convertDateTime(value.bsRangeValue['0']);
            params.endTime = this.convertDateTime(value.bsRangeValue['1']);
        }

        params.limit = 20;
        params.page = 1;
        // this.country = params.store;
        // this.getProvinces();
        this.loadPolicy(params.store);
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
        // this.getSeller();
    }

    followOrder() {
        this.checkF = !this.checkF;
    }

    chat(id, code, status) {
        this.checkLoad = true;
        this.statusO = status;
        this.orderIdChat = id;
        this.code = code;
    }

    chatG(id, code, status) {
      this.statusO = status;
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
        if (this.typeViewLogs === 'actionlog') {
            this.orderService.get(`${this.typeViewLogs}/${code}`, undefined).subscribe(res => {
                const rs = res;
                this.listLog = rs.data;
            });
        }
    }

    confirmAll(id) {
        const messagePop = 'Do you want Confirm order ' + id;
        this.popup.warning(() => {
            const put = this.orderService.createPostParams({
            }, 'confirmPurchase');
            this.orderService.put(`order/${id}`, put).subscribe(res => {
                if (res.success) {
                    this.listOrders();
                    this.popup.success(res.message);
                } else {
                    this.popup.error(res.message);
                }
            });
        }, messagePop);
    }
    checkMarkAsJunk(status, priceCheck) {
      if ((status !== 'NEW' || status !== 'SUPPORTING' || status !== 'SUPPORTED' || status !== 'CANCEL') && priceCheck > 0) {
          return true;
      }
    }
    markAsJunk(id) {
      const messagePop = 'Do you want Mark As Junk order ' + id;
      this.popup.warning(() => {
        const put = this.orderService.createPostParams({
          current_status: 'JUNK',
        }, 'updateStatus');
        this.orderService.put(`order/${id}`, put).subscribe(res => {
          if (res.success) {
            this.listOrders();
            this.popup.success(res.message);
          } else {
            this.popup.error(res.message);
          }
        });
      }, messagePop);
    }

  loadViewSale(event) {
      if (event) {
        this.listOrders();
      }
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

    loadData(tab, id) {
        if (tab !== this.typeViewLogs) {
            this.orderService.get(`${tab}/${id}`, undefined).subscribe(res => {
                const rs = res;
                this.listLog = rs.data;
                console.log(this.listLog.length);
            });
        }
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
        const messagePop = 'Do you want Cancel order ' + id;
        this.popup.warning(() => {
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
        }, messagePop);
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

    updateAdjustPayment(order) {
        this.AdjustPaymentOderId = order.id;
        this.total_paid_amount_local = order.total_paid_amount_local;
        this.code = order.ordercode;
        this.store_id = order.store_id;
        this.checkOpenAdJustPayment = true;
        this.editForm = this.fb.group({
            total_paid_amount_local: this.total_paid_amount_local
        });
    }

    confirmAdjustPayment() {
        const messagePop = 'Do you want Confirm Adjust Payment';
        this.popup.warning(() => {
            const put = this.orderService.createPostParams({
                total_paid_amount_local: this.editForm.value.total_paid_amount_local
            }, 'editAdjustPayment');
            this.orderService.put(`order/${this.AdjustPaymentOderId}`, put).subscribe(res => {
                if (res.success) {
                    this.listOrders();
                    this.popup.success(res.message);
                    $('.modal').modal('hide');
                } else {
                    this.popup.error(res.message);
                }
            });
        }, messagePop);
    }

    updateCoupon(order) {
        this.coupon_id = order.coupon_id;
        this.orderID = order.id;
        this.code = order.ordercode;
        this.store_id = order.store_id;
        this.checkOpenCoupon = true;
    }

    updatePromotion(order) {
        this.promotion_id = order.promotion_id;
        this.orderID = order.id;
        this.code = order.ordercode;
        this.store_id = order.store_id;
        this.checkOpenPromotion = true;
    }

    offOption() {
        this.checkOpenCoupon = false;
        this.checkOpenPromotion = false;
        this.checkOpenAdJustPayment = false;
        this.checkOpenPayBack = false;
        this.checkSellerRefund = false;
        this.checkOrderChatRefund = false;
        $('.modal').modal('hide');
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
            if (localStorage.getItem('scope') === ('superAdmin' || 'admin' || 'sale' || 'warehouse' || 'master_sale' || 'tester')) {
                return true;
            }
        }
    }
    openUpdatePayBack(order) {
        this.AdjustPaymentOderId = order.id;
        this.total_refund_amount_local = order.total_refund_amount_local;
        this.checkOpenPayBack = true;
        this.code = order.ordercode;
        this.store_id = order.store_id;
        this.editForm = this.fb.group({
            total_refund_amount_local: this.total_refund_amount_local
        });
    }

    updatePayBack() {
        const messagePop = 'Do you want Update Pay Back ' +
            '' + (this.total_refund_amount_local + ' ' +
                'to' + ' ' + this.editForm.value.total_refund_amount_local);
        this.popup.warning(() => {
            const put = this.orderService.createPostParams({
                total_refund_amount_local: this.editForm.value.total_refund_amount_local
            }, 'updatePayBack');
            this.orderService.put(`order/${this.AdjustPaymentOderId}`, put).subscribe(res => {
                if (res.success) {
                    this.listOrders();
                    this.popup.success(res.message);
                    $('.modal').modal('hide');
                } else {
                    this.popup.error(res.message);
                }
            });
        }, messagePop);
    }

    openSellerRefund(order) {
        this.AdjustPaymentOderId = order.id;
        this.code = order.ordercode;
        this.purchase_amount_buck = order.purchase_amount_buck;
        this.purchase_amount_refund = order.purchase_amount_refund;
        this.checkSellerRefund = true;
        this.store_id = order.store_id;
        this.editForm = this.fb.group({
            purchase_amount_buck: this.purchase_amount_buck,
            purchase_amount_refund: this.purchase_amount_refund,
        });
    }

    updateSellerRefund() {
        const messagePop = 'Do you want Update Seller Refund';
        this.popup.warning(() => {
            const put = this.orderService.createPostParams({
                purchase_amount_buck: this.editForm.value.purchase_amount_buck,
                purchase_amount_refund: this.editForm.value.purchase_amount_refund
            }, 'updateSellerRefund');
            this.orderService.put(`order/${this.AdjustPaymentOderId}`, put).subscribe(res => {
                if (res.success) {
                    this.listOrders();
                    this.popup.success(res.message);
                    $('.modal').modal('hide');
                } else {
                    this.popup.error(res.message);
                }
            });
        }, messagePop);
    }
    handleChangeAmount(event) {
        if (event) {
            $('.modal').modal('hide');
            this.listOrders();
        }
    }
  handCheckPromotion(event) {
      if (event) {
        this.checkOpenPromotion = false;
        this.checkOpenCoupon = false;
        $('.modal').modal('hide');
      }
  }
  buyNow(item) {
  }
  getLinkBuynow(pro) {
      let link = pro.link_origin;
      if (link.indexOf('?')) {
          link = link + '&order_id=' + pro.order_id;
      } else {
          link = link + '?order_id=' + pro.order_id;
      }
      return link;
  }

  paid(totalpaid, price) {
      if (totalpaid > 0) {
        return true;
      } else {
        return false;
      }
  }
  openOrderChatRefund(order) {
      this.code = order.ordercode;
      this.markID = order.id;
      this.status = order.status;
      this.checkOrderChatRefund = true;
      this.editForm = this.fb.group({
        wait1: '',
        wait2: '',
        wait3: '',
        link_image: '',
        messageCustomer: '',
      });
  }
  updateMarkWaiting() {
    const params = this.prepareMarkWaiting();
    const messagePop = 'Do you want mark supporting';
    if (params.message !== '') {
      this.orderService.postChat(params.messageCustomer).subscribe(res => {
      });
    }
    this.popup.warning(() => {
      const put = this.orderService.createPostParams({
        mark_supporting: params.mark,
        current_status: 'SUPPORTING',
      }, 'updateMarkSupporting');
      this.orderService.put(`order/${this.markID}`, put).subscribe(res => {
        if (res.success) {
          this.popup.success(res.message);
        } else {
          this.popup.error(res.message);
        }
      });
    }, messagePop);
  }
  prepareMarkWaiting() {
    const value = this.editForm.value;
    const params: any = {};
    if (value.messageCustomer !== '') {
      params.message = value.messageCustomer;
    }
    if (value.link_image !== '') {
      params.link_image = value.link_image;
    }
    if (value.wait1 !== '') {
      params.mark = value.wait1;
    }
    if (value.wait2 !== '') {
      params.mark = value.wait2;
    }
    if (value.wait3 !== '') {
      params.mark = value.wait3;
    }
    if (value.messageCustomer !== '') {
      params.messageCustomer = value.messageCustomer;
    }
    if (this.status === 'NEW') {
      params.isNew = 'yes';
    }
    params.type_chat = 'WS_CUSTOMER';
    params.suorce = 'BACK_END';
    return params;
  }

  filterClick(item) {
    if (item === 'UNPAID') {
      this.searchForm.patchValue({
        paymentStatus: item,
      });
      this.listOrders();
    }
    if (item === '10STOCKOUT_US' || item === 'PURCHASED2DAY' || item === 'STOCKIN_US2DAY' || item === 'SHIPPED5' || item === 'NO_TRACKING') {
      this.searchForm.patchValue({
        noTracking: item,
      });
      this.listOrders();
    }
  }
}

