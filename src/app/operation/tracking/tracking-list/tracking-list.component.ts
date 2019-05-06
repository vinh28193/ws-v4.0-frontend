import {Component, OnInit, ViewChild} from '@angular/core';
import {TrackingDataComponent} from '../tracking-data.component';
import {TrackingService} from '../tracking.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PopupService} from '../../../core/service/popup.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ModalDirective} from 'ngx-bootstrap';
import {ScopeService} from '../../../core/service/scope.service';

@Component({
    selector: 'app-tracking-list',
    templateUrl: './tracking-list.component.html',
    styleUrls: ['./tracking-list.component.css']
})
export class TrackingListComponent extends TrackingDataComponent implements OnInit {

    @ViewChild('usSendingModal') usSendingModal: ModalDirective;
    @ViewChild('mergeTracking') mergeTracking: ModalDirective;
    @ViewChild('sellerRefundModal') sellerRefundModal: ModalDirective;
    @ViewChild('updateModal') updateModal: ModalDirective;

    public tracks: any = [];
    public manifests: any = [];
    public productIds: any = [];
    public trackingT = '';
    public trackingE = '';
    public trackingMergeSearch = '';
    public tabTracking = 'tracking';
    public trackingCodes: any = [];
    public p_e = 1;
    public p_t = 1;
    public l_e = 20;
    public l_t = 20;
    public limit_page = 9;
    public manifest_id = '';
    public filter_t = '';
    public filter_e = '';
    public trackingMerge: any = {
        data_id: '',
        ext_id: '',
        data_tracking_code: '',
        ext_tracking_code: '',
        type: '',
    };
    public sellerRefundForm: any = {
        id: '',
        tracking: '',
        type: 'full',
        amount: 0.00,
        time: '',
    };
    public updateForm: any = {
        id: '',
        tracking: '',
        order_id: '',
        product_id: '',
        purchase_invoice_number: '',
        item_name: '',
        type: 'data_draft',
    };
    // file
    public file: File;
    // form
    public usSendingForm: FormGroup;
    public searchForm: FormGroup;

    constructor(
        public trackingService: TrackingService,
        public popUp: PopupService,
        public fb: FormBuilder,
        public sanitizer: DomSanitizer,
        public _scope: ScopeService
    ) {
        super(trackingService, _scope);
    }

    ngOnInit() {
        this.currentPage = 1;
        this.perPage = 20;
        this.buildSearchForm();
        this.buildUsSendingForm();
        this.search();
        this.loadWarehouse();
    }

    buildSearchForm() {
        this.searchForm = this.fb.group({
            q: '',
            page: this.currentPage,
            perPage: this.perPage,
        });
    }

    buildUsSendingForm() {
        this.usSendingForm = this.fb.group({
            store: [''],
            manifest: [''],
            warehouse: [''],
            warehouse_us: [''],
            date: '',
            file: ['']
        });
    }

    get store(): string {
        return this.usSendingForm.get('store').value;
    }

    public handleFileChange(event) {
        this.file = event.target.files[0];
    }

    public preCreate() {
        const value = this.usSendingForm.getRawValue();
        if (typeof this.file === 'undefined') {
            this.popUp.error('no file update ?');
        }
        // return {
        //     store: value.store,
        //     warehouse: value.warehouse,
        //     manifest: value.manifest,
        //     file: this.file
        // };
        const fd = new FormData();
        fd.append('store', value.store);
        fd.append('warehouse_us', value.warehouse_us);
        fd.append('warehouse', value.warehouse);
        fd.append('manifest', value.manifest);
        fd.append('file', this.file);
        fd.append('date', value.date);
        return fd;
    }

    public create() {
        this.trackingService.create(this.preCreate()).subscribe(res => {
            const rs: any = res;
            if (rs.success) {
                this.popUp.success(rs.message);
                this.usSendingModal.hide();
            } else {
                this.popUp.error(rs.message);
                this.buildUsSendingForm();
            }
        });
    }

    public preSearch() {
        const value = this.searchForm.value;

        const params: any = {
            t_t: this.trackingT,
            t_e: this.trackingE,
            m: this.manifest_id,
            ps_t: this.l_t,
            ps_e: this.l_e,
            p_t: this.p_t,
            p_e: this.p_e,
            f_t: this.filter_t,
            f_e: this.filter_e,
            ps_m: value.perPage,
            p_m: value.page
        };
        if (value.q !== '') {
            params.q = value.q;
        }
        return params;
    }

    search(type = 'search', id = null) {
        this.manifest_id = id;
        const params = this.preSearch();
        if (type === 'search') {
            params.m = '';
            this.manifest_id = '';
        }
        this.trackingService.searchUsSending(params).subscribe(response => {
            const rs: any = response;
            if (rs.success) {
                const data: any = rs.data;
                this.tracks = data._items;
                if (type === 'search') {
                    this.manifests = data._manifest ? data._manifest : this.manifests;
                }
                this.tracks = data;
                this.totalCount = data._manifest_total ? data._manifest_total : this.totalCount;
                this.pageCount = Math.floor(this.totalCount / params.ps_m);
                this.currentPage = params.p_m;
                this.perPage = params.ps_m;
                this.setTabTracking(this.tabTracking);
            } else {
                this.popUp.error(rs.message);
            }
        });
    }

    clickTab(id) {
        if (id !== this.manifest_id) {
            this.search('tracking', id);
        }
    }
    openUsSendingModal() {
        this.buildUsSendingForm();
        this.usSendingModal.show();
    }

    handlePagination(event) {
        const page = event.page;
        this.searchForm.patchValue({page: page});
        this.search();
    }

    handlePerPage(event) {
        const value = event.target.value;
        this.searchForm.patchValue({perPage: value});
        this.search();
    }

    merge() {
        const listCheck = this.getExtTrackings('tracking');
        if (!listCheck || listCheck === []) {
            return this.popUp.error('Cannot find tracking code target!');
        }
        this.trackingService.popup.confirm(() => {
            this.trackingService.post('s-us-send', this.trackingMerge).subscribe(rs => {
                const res: any = rs;
                if (res.success) {
                    this.popUp.success(res.message);
                    this.search('tracking');
                    this.clearMerge();
                    this.mergeTracking.hide();
                } else {
                    this.popUp.error(res.message);
                }
            });
        }, this.trackingMerge.data_tracking_code + ' merge ' + this.trackingMerge.ext_tracking_code, 'Merge');
    }

    clearMerge() {
        this.trackingMerge = {
            data_id: '',
            ext_id: '',
            data_tracking_code: '',
            ext_tracking_code: '',
            type: '',
        };
    }

    showSellerRefundModal(packTr) {
        this.sellerRefundForm.id = packTr.id;
        this.sellerRefundForm.tracking = packTr.tracking_code;
        this.sellerRefundModal.show();
    }

    updateSellerRefund() {
        if (!this.sellerRefundForm.amount || !this.sellerRefundForm.time) {
            return this.popUp.error('All field cannot null!');
        }
        this.trackingService.sellerRefundUsSending(this.sellerRefundForm.id, this.sellerRefundForm).subscribe(rs => {
            const res: any = rs;
            if (res.success) {
                this.popUp.success(res.message);
                this.search('tracking');
                this.sellerRefundModal.hide();
            } else {
                this.popUp.error(res.message);
            }
        });
    }

    showUpdateForm(packTr) {
        this.updateForm.id = packTr.id;
        this.updateForm.item_name = packTr.item_name;
        this.updateForm.order_id = packTr.order_id;
        this.updateForm.product_id = packTr.product_id;
        this.updateForm.purchase_invoice_number = packTr.purchase_invoice_number;
        this.updateForm.tracking = packTr.tracking_code;
        this.updateModal.show();
    }

    update() {
        if (!this.updateForm.purchase_invoice_number ||
            !this.updateForm.product_id || !this.updateForm.order_id || !this.updateForm.item_name) {
            return this.popUp.error('All field cannot null!');
        }
        this.trackingService.put('us-sending/' + this.updateForm.id, this.updateForm).subscribe(rs => {
            const res: any = rs;
            if (res.success) {
                this.popUp.success(res.message);
                this.updateModal.hide();
                this.search('tracking');
            } else {
                this.popUp.error(res.message);
            }
        });
    }

    setTabTracking(tab) {
        if (tab === 'ext') {
            this.trackingCodes = this.tracks._ext;
            this.tabTracking = tab;
        } else {
            this.trackingCodes = this.tracks._tracking;
            this.tabTracking = 'tracking';
        }
    }

    regetType(id) {
        this.trackingService.reGetType(id, {}).subscribe(rs => {
            if (rs.success) {
                this.popUp.success(rs.message);
                // this.search();
            } else {
                this.popUp.error(rs.message);
            }
        });
    }

    searchEvent(event) {
        let fil = '';
        if (!event.filter.order_code || !event.filter.sku || !event.filter.tracking_code || event.filter.type_tracking) {
            fil = window.btoa(JSON.stringify(event.filter));
        }
        if (this.tabTracking === 'tracking') {
            this.p_t = event.page;
            this.l_t = event.limit;
            this.filter_t = fil;
        } else {
            this.p_e = event.page;
            this.l_e = event.limit;
            this.filter_e = fil;
        }
        this.search('tracking');
    }

    mergeTrackingEvent(event) {
        this.trackingMerge.data_tracking_code = event.tracking_code;
        this.trackingMerge.data_id = event.id;
        this.mergeTracking.show();
    }

    getExtTrackings(type = 'search') {
        let rs = this.tracks._ext;
        if (this.trackingMerge.ext_tracking_code || this.trackingMergeSearch) {
            const match = type === 'search' ? this.trackingMergeSearch : this.trackingMerge.ext_tracking_code;
            rs = this.tracks._ext.filter(
                c => c.tracking_code.toUpperCase().indexOf(match.toUpperCase()) !== -1);
            console.log(rs);
        }
        return rs;
    }

    setTrackingTarget(id, tracking) {
        this.trackingMerge.ext_tracking_code = tracking;
        this.trackingMerge.ext_id = id;
    }

    exportExcel(id) {
        this.trackingService.get('us-sending/' + id).subscribe(
            rs => {
                if (rs.success) {
                    this.popUp.success(rs.message);
                    location.assign(rs.data.link);
                } else {
                    this.popUp.error(rs.message);
                }
            }
        );
    }
}
