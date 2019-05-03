import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OrderDataComponent} from '../order-data.component';
import {OrderService} from '../order.service';
import {ModalDirective} from 'ngx-bootstrap';
import {PopupService} from '../../../core/service/popup.service';
import {orderStatus, paymentRequests, searchKeys, timeKeys} from '../order-enum';
import {toNumber} from 'ngx-bootstrap/timepicker/timepicker.utils';
import {AuthService} from '../../../core/service/auth.service';
import {Router} from '@angular/router';
import {ScopeService} from '../../../core/service/scope.service';
import {MessagingService} from '../../../shared/messaging.service';
import {NotificationsService} from '../../../core/service/notifications.service';
import {StorageService} from '../../../core/service/storage.service';

declare var jQuery: any;
declare var $: any;

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css']
})
export class OrderListComponent extends OrderDataComponent implements OnInit {
    @ViewChild(ModalDirective) showPromotion: ModalDirective;
    @ViewChild(ModalDirective) showChatGroup: ModalDirective;
    public pro: any = {};
    public pack: any = {};
    public pay: any = {};
    public pur: any = {};
    public createC: any = {};
    public delivevery: any = {};
    public quantity: any = {};
    public create: any = {};
    public click_pur: any = {};
    public orders: any = [];
    public listChatCheck: any = [];
    public listTrackingLog: any = [];
    public total: any;
    public chatId: any;
    public totalChat: any;
    public tracking_code: any;
    public quantityP = 0;
    public quantityC = 0;
    public quantityI = 0;
    public statusO: any;
    public totalUnPaid: any;
    public checkStatusValue: any;
    public countPurchase: any;
    public purchase2Day: any;
    public currentStatusOrder: any;
    public noTrackingCount: any;
    public orderList: any;
    public purchase: any;
    public stockin_us: any;
    public countUS: any;
    public dateTime: Date;
    public orderIdChat: any;
    public code: any;
    public totalOrder: any;
    public proId: any;
    public codeG: any;
    public checkLoad = false;
    public checkLoadG = false;
    public AdjustPaymentOderId = false;
    public checkCreateOrderChatRefund = false;
    public checkListOrderChatRefund = false;
    public updateOrderId: any;
    public updateOrderPurchaseId: any;
    public listSeller: any = [];
    public listSale: any = [];
    public email: any;
    public sale_support_id: any;
    public productUpdateFee: any;
    public hideme: any = {};
    public orderFee: any = {};
    public statusOrderShow: any = {};
    public statusShow: any = {};
    public total_paid_amount_local: any;
    public statusOd: any;
    public inputs: any;
    public purchase_amount_refund: any;
    public purchase_amount_buck: any;
    public total_refund_amount_local: any;
    // form Group
    public searchForm: FormGroup;
    public editForm: FormGroup;
    public formAsignUser: FormGroup;
    public chatSupporting: FormGroup;
    public createTemplate: FormGroup;
    public formCreate: FormGroup;
    public messageCustomer: FormGroup;
    public updateTemplate: FormGroup;
    public checkFormShow: FormGroup;
    public formSearchList: FormGroup;
    public checkOpenAdJustPayment = false;
    public checkOpenPromotion = false;
    public checkOpenPayBack = false;
    public checkSellerRefund = false;
    public checkOpenCoupon = false;
    public checkOrderChatRefund = false;
    public checkUpdateOderCode = false;
    public checkUpdateQuantity = false;
    orderStatus: any = [];
    searchKeys: any = [];
    timeKeys: any = [];
    products: any;
    provinces: any = [];
    public bsRangeValue: Date[];
    paymentRequests: any = [];
    public listChatTem: any = [];
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
    public checkReady2Purchase: any;
    public typeViewLogs = 'actionlog';
    public listLog: any = [];
    public logIdOrder: any;
    public coupon_id: any;
    public promotion_id: any;
    public activeOrder: any = [];
    public prods: any = [];
    public checkUpdateCustomer = false;
    public checkUpdateOrderChatRefund = false;
    public checkOpenTracking = false;
    public chatlists: any = [];
    public orderNotifi: any = [];
    public paramsOrder: any = [];
    public idOrder: any;
    message;

    constructor(private orderService: OrderService,
                private router: Router,
                private popup: PopupService,
                private fb: FormBuilder,
                private _authService: AuthService,
                public _scope: ScopeService,
                private messagingService: MessagingService,
                public  notifi: NotificationsService,
                public storegate: StorageService,

    ) {
        super(orderService);
    }

    followOrder(ordercode) {
        this.checkF = !this.checkF;

        /**Notification**/
        this.messagingService.receiveMessage();
        this.message = this.messagingService.currentMessage ? this.messagingService.currentMessage : '';
        this.paramsOrder = this.messagingService.sendSubscription(ordercode);
        // console.log(this.paramsOrder);
        this.notifi.post(`notifications`, this.paramsOrder).subscribe(ret => {
            console.log('JOSN ' + JSON.stringify(ret));
            const res: any = ret;
            // console.log('res send token Subscription ' + JSON.stringify(res));
            if (res.success) {
                const rs: any = res.data;
                // console.log('Notifi data : ' + JSON.stringify(rs));
                this.loadOrderNotifi();
                this.orderNotiCheck(ordercode);
                return true;
            } else {
                // console.error('Error notify sendSubscription.' + JSON.stringify(res));
                return false;
            }
        });
    }

    ngOnInit() {
        this.currentPage = 1;
        this.perPage = 20;
        this.dateTime = new Date();
        this.loadOrderNotifi();
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
        this.messagingService.receiveMessage();
        this.message = this.messagingService.currentMessage ? this.messagingService.currentMessage : '';
        this.loadAllPolicy();
        $(document).on('show.bs.modal', '.modal', function () {
          var zIndex = 1040 + (10 * $('.modal:visible').length);
          $(this).css('z-index', zIndex);
          setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
          }, 0);
        });
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
        this.orderService.post('chatlists', params).subscribe(res => {
            this.buildChat();
            this.listChatsSupporting();
        });
    }

    deleteChatSupporting(index) {

        this.orderService.delete('chatlists/' + index).subscribe(res => {
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
            quantityA += toNumber(quantityC[i]['quantity_customer']);
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
    checkUpdatePayment(status) {
      if (this._scope.checkSuperAdmin() || this._scope.checkTester()) {
        if (status !== 'CANCEL') {
          return true;
        }
      }
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

    unfollowOrder(ordercode) {
          // this.checkF = !this.checkF;

          const fingerprint = this.messagingService.UUID();
          this.orderService.deleteParam('notifications/'+fingerprint,ordercode).subscribe(res => {
          this.loadOrderNotifi();
          this.orderNotiCheck(ordercode);

         });
    }
    loadOrderNotifi() {
          const fingerprint = this.messagingService.UUID();
          this.orderService.get(`notifications/${fingerprint}`, undefined )
            .subscribe(res => {
              this.orderNotifi = 0;
              if (res.success) {
                   const order_list = res.data.order_list;
                   this.orderNotifi = order_list;
              }
         });

    }
    orderNotiCheck(ordercode) {
       if (this.orderNotifi === 0) {
         return false ;
       }
       const orderNotifi = this.orderNotifi;

       if (ordercode in orderNotifi) {
           return true;
       }
       return false;

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

    confirmAll(order) {
        for (let i = 0; i < order.products.length; i++) {
          if (order.products[i]['custom_category_id'] === '') {
            this.checkReady2Purchase = 'yes';
          }
        }
        const messagePop = 'Do you want Confirm order ' + order.id;
        this.popup.warning(() => {
            const put = this.orderService.createPostParams({
              current_status: 'SUPPORTED',
              checkR2p: this.checkReady2Purchase,
            }, 'confirmPurchase');
            this.orderService.put(`order/${order.id}`, put).subscribe(res => {
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
        if ((status !== 'NEW' || status !== 'SUPPORTING' || status !== 'SUPPORTED' || status !== 'CANCEL')) {
          if (priceCheck > 0) {
            return true;
          }
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
        this.checkUpdateOderCode = false;
        this.checkListOrderChatRefund = false;
        this.checkOpenTracking = false;
        $('.modal').modal('hide');
    }
    offOption2() {
      this.checkCreateOrderChatRefund = false;
      this.checkUpdateOrderChatRefund = false;
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
    checkConfirmOrder(order) {
      if (order.current_status === 'NEW' || order.current_status === 'SUPPORTING' || order.current_status === 'SUPPORTED') {
        if (this._scope.CheckSale()) {
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
  openListOrderChatRefund(order) {
      this.code = order.ordercode;
    this.checkListOrderChatRefund = true;
    this.formSearchList = this.fb.group({
        noteL: '',
        contentL: '',
    });
    this.loadListTemChat();
  }

  buildListChat() {
      const value = this.formSearchList.value;
      const params: any = {};
      if (value.noteL !== '') {
        params.noteL = value.noteL;
      }
    if (value.contentL !== '') {
      params.contentL = value.contentL;
    }
    return params;
  }

  openCreateOrderChatRefund() {
    this.checkCreateOrderChatRefund = true;
    this.createTemplate = this.fb.group({
      noteC: '',
      contentC: '',
      statusC: '',
    });
  }

    openOrderChatRefund(order) {
        this.code = order.ordercode;
        this.markID = order.id;
        this.status = order.status;
        this.checkOrderChatRefund = true;
        this.editForm = this.fb.group({
            note_chat: '',
            link_image: '',
        });
        this.messageCustomer = this.fb.group({
          messageCustomer: '',
        });
        this.loadListTemChatRefund();
    }
    enterChat() {
      const params = this.prepareMarkWaiting();
      if (params.message !== '') {
        this.orderService.postChat(params).subscribe(res => {
        });
      }
    }
    updateMarkWaiting() {
        const params = this.prepareMarkWaiting();
        const messagePop = 'Do you want mark supported';
        if (params.message) {
            this.orderService.postChat(params).subscribe(res => {
            });
        }
        if (params.link_image) {
          console.log(params.link_image);
          this.orderService.post('link-image', params).subscribe(res => {
          });
        }
        this.popup.warning(() => {
            const put = this.orderService.createPostParams({
                mark_supporting: params.mark,
                current_status: 'SUPPORTED',
            }, 'updateMarkSupported');
            this.orderService.put(`order/${this.markID}`, put).subscribe(res => {
                if (res.success) {
                  this.listOrders();
                    this.popup.success(res.message);
                } else {
                    this.popup.error(res.message);
                }
            });
        }, messagePop);
    }

    prepareMarkWaiting() {
        const value = this.editForm.value;
        const valueChat = this.messageCustomer.value;
        const params: any = {};
        if (valueChat.messageCustomer !== '') {
            params.message = valueChat.messageCustomer;
        }
        if (value.link_image) {
            params.link_image = value.link_image;
        }
        if (value.note_chat !== '') {
            params.mark = value.note_chat;
        }
        if (this.status === 'NEW') {
            params.isNew = 'yes';
        }
        params.type_chat = 'GROUP_WS';
        params.Order_path  = this.code;
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
    checkCouponPromotion(paid) {
      if (this._scope.checkSuperAdmin() || this._scope.checkTester())  {
        if (paid > 0) {
          return false;
        }
        return true;
      }
    }
    checkShowPayBack(paid) {
      if (this._scope.checkRoleOption() || this._scope.checkOperatione()) {
        if (paid === 0 || paid === null || paid === '') {
          return false;
        }
        return true;
      }
    }
    openUpdateOrderCode(ordercode, id) {
      this.code = ordercode;
      this.markID = id;
      this.checkUpdateOderCode = true;
      this.getSeller();
      this.orderDetail();

    }
    orderDetail() {
      this.orderService.get(`order/${this.code}`).subscribe(res => {
        this.orderList = res.data[0];
        if (this.orderList.current_status === 'READY2PURCHASE') {
          this.statusOd = 'ready_purchase';
        } else {
          this.statusOd = this.orderList.current_status.toLowerCase();
        }
        this.formAsignUser = this.fb.group({
          statusOrder: this.statusOd,
        });
        this.buildFormCreate();
      });
    }
    loadForm() {
      const value = this.formAsignUser.value;
      const params: any = {};
      if (value.statusOrder !== '') {
        params.status = value.statusOrder;
      }
        params.ordercode = this.orderList.ordercode;
      return params;
    }
    updateOrderCode() {
      const params = this.loadForm();
      params.codeAll = this.listChatCheck;
      if ((params.status) === 'ready_purchase' ) {
          this.currentStatusOrder = 'ready2purchase';
      } else {
        this.currentStatusOrder = params.status;
      }
      const put = this.orderService.createPostParams({
        status: params.status,
        current_status: this.currentStatusOrder,
      }, 'updateOrderStatus');
      this.orderService.put(`order/${this.markID}`, put).subscribe(res => {
        if (res.success) {
          this.orderDetail();
          this.listOrders();
        } else {
          this.popup.error(res.message);
        }
      });
    }
    buildFormCreate() {
      this.formCreate = this.fb.group({
        link_image: '',
        name_pro: '',
        link_pro: '',
        link_origin: '',
        price_amount_origin_pro: '',
        variations_pro: '',
        portal_pro: '',
        sku_pro: '',
        sku_parent_pro: '',
        price_amount_local_pro: '',
        seller_id: this.allKey,
        total_price_amount_local_pro: '',
        quantity_purchase: '',
        quantity_customer: '',
      });
    }
    getSeller() {
      this.orderService.get('seller').subscribe(res => {
        this.listSeller = res.data;
      });
    }
    buildValueCreate() {
      const value = this.formCreate.value;
      const params: any = {};
      if (value.link_image !== '') {
        params.link_image = value.link_image;
      }
      if (value.name_pro !== '') {
        params.name_pro = value.name_pro;
      }
      if (value.link_pro !== '') {
        params.link_pro = value.link_pro;
      }
      if (value.link_origin !== '') {
        params.link_origin = value.link_origin;
      }
      if (value.quantity_purchase !== '') {
        params.quantity_purchase = value.quantity_purchase;
      }
      if (value.quantity_customer !== '') {
        params.quantity_customer = value.quantity_customer;
      }
      if (value.price_amount_origin_pro !== '') {
        params.price_amount_origin_pro = value.price_amount_origin_pro;
      }
      if (value.variations_pro !== '') {
        params.variations_pro = value.variations_pro;
      }
      if (value.portal_pro !== '') {
        params.portal_pro = value.portal_pro;
      }
      if (value.sku_pro !== '') {
        params.sku_pro = value.sku_pro;
      }
      if (value.total_price_amount_local_pro !== '') {
        params.total_price_amount_local_pro = value.total_price_amount_local_pro;
      }
      if (value.sku_parent_pro !== '') {
        params.sku_parent_pro = value.sku_parent_pro;
      }
      if (value.price_amount_local_pro !== '') {
        params.price_amount_local_pro = value.price_amount_local_pro;
      }
      if (value.seller_id !== '' || value.seller_id !== 'All Seller') {
        params.seller_id = value.seller_id;
      }
        params.id = this.markID;
      return params;
    }
    createPro() {
      const params = this.buildValueCreate();
      this.orderService.post('product', params).subscribe(res => {
        this.orderDetail();
      });
    }
  updateNull(column, id) {
      console.log(column);
    const messagePop = 'Do you want Delete';
    this.popup.warning(() => {
      const put = this.orderService.createPostParams({
        column: column,
      }, 'updateTimeNull');
      this.orderService.put(`order/${id}`, put).subscribe(res => {
        if (res.success) {
          this.orderDetail();
          this.listOrders();
        } else {
          this.popup.error(res.message);
        }
      });
    }, messagePop);
  }
  clickEdit(qtyP, qtyC, qtyI, id, ordercode) {
      this.quantityP = qtyP;
      this.code = ordercode;
      this.quantityC = qtyC;
      this.quantityI = qtyI;
      this.proId = id;
      this.checkUpdateQuantity = true;
  }
  updateQuantityPr() {
    const params: any = {};
    params.quantityP = toNumber(this.quantityP);
    params.quantityC = toNumber(this.quantityC);
    params.quantityI = toNumber(this.quantityI);
    params.title = 'quantity';
    params.order_path = this.code;
    this.orderService.put(`product/${this.proId}`, params).subscribe(res => {
      if (res.success) {
        this.checkUpdateQuantity = false;
        this.orderDetail();
      }
    });
  }
  packageItem(event) {
      // console.log(event);
  }
  buildChatCreate() {
    const value = this.createTemplate.value;
    const params: any = {};
    params.noteC = value.noteC;
    params.contentC = value.contentC;
    params.statusC = value.statusC;
    return params;
  }
  loadListTemChat() {
      const params = this.buildListChat();
      params.limit = 20;
      this.orderService.getListTem(params).subscribe(res => {
        this.listChatTem = res.data;
        this.totalChat = res.total;
      });
  }
  loadListTemChatRefund() {
    const params: any = {};
    params.limit = 20;
    this.orderService.getListTem(params).subscribe(res => {
      this.listChatTem = res.data;
      this.totalChat = res.total;
    });
  }
  createTemplateChat() {
      const params = this.buildChatCreate();
      this.orderService.post('list-chat-mongo', params).subscribe(res => {
        const rs: any = res;
      if (rs.success) {
        this.loadListTemChat();
        this.popup.success(rs.message);
      }
    });
  }
  loadPro(storeId) {
    this.loadPolicy(storeId);
  }
  buildChatUpdate() {
    const value = this.updateTemplate.value;
    const params: any = {};
    params.noteU = value.noteU;
    params.contentU = value.contentU;
    return params;
  }
  editListTemplate() {
      const params = this.buildChatUpdate();
      this.orderService.put(`list-chat-mongo/${this.chatId}`, params).subscribe(res => {
        if (res.success) {
          this.loadListTemChat();
          this.popup.success(res.message);
        }
      });
  }
  removeListTemplate(id) {
    const messagePop = 'Do you want Delete';
    this.popup.warning(() => {
      this.orderService.delete(`list-chat-mongo/${id}`).subscribe(res => {
        if (res.success) {
          this.loadListTemChat();
          this.popup.success(res.message);
        }
      });
    }, messagePop);
  }
  openUpdateOrderChatRefund(cn) {
    this.checkUpdateOrderChatRefund = true;
    this.chatId = cn.code;
    this.updateTemplate = this.fb.group({
      noteU: cn.note,
      contentU: cn.content,
    });
  }

  checkboxAttribute(reference, type = 'id') {
    return 'checkbox' + type.charAt(0).toUpperCase() + type.slice(1) + reference;
  }
  checkBox(id) {
    const e = $('input[name=' + this.checkboxAttribute(id, 'name') + ']');
    if ($(e).is(':checked')) {
      this.listChatCheck.push(id);
    } else {
      if (this.listChatCheck.indexOf(id) !== -1) {
        this.listChatCheck.splice(this.listChatCheck.indexOf(id), 1);
      }
    }
    console.log(this.listChatCheck);
  }
  openTracking(order) {
      this.tracking_code = order.package.tracking_code;
      this.code = order.ordercode;
      this.prods = order.products;
      this.checkOpenTracking = true;
      const params: any = {};
      params.tracking_code = this.tracking_code;
      this.orderService.get('trackinglogs', params).subscribe(res => {
        if (res.success) {
          this.listTrackingLog = res.data;
        }
      });
  }

  checkChatNote(code, status) {
      console.log(status);
      const params: any = {};
      if (status === 1) {
        params.statusChat = 0;
      }
      if (status === 0) {
        params.statusChat = 1;
      }
      params.checkStatusValue = 'checkStatusValue';
      this.orderService.put(`list-chat-mongo/${code}`, params).subscribe(res => {
        this.loadListTemChat();
      });
  }

    checkShowUpdateStatus(status) {
        if (status === 'PURCHASED') {
            return 'SELLER SHIPPED';
        } else if (status === 'SELLER_SHIPPED') {
            return 'US RECEIVED';
        } else if (status === 'US_RECEIVED') {
            return 'US SENDING';
        } else if (status === 'US_SENDING') {
            return 'LOCAL RECEIVED';
        } else if (status === 'LOCAL_RECEIVED') {
            return 'DELIVERING';
        } else if (status === 'DELIVERING') {
            return 'AT CUSTOMER';
        } else {
            return false;
        }
    }

    updateStatus(id) {
        this.orderService.put('order-s/' + id, {}).subscribe(res => {
            const rs: any = res;
            if (rs.success) {
                this.listOrders();
                this.popup.success(rs.message);
            } else {
                this.listOrders();
                this.popup.error(rs.message);
            }
        });
    }
}

