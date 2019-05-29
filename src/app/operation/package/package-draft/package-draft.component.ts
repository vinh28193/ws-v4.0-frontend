import {Component, OnInit, ViewChild} from '@angular/core';
import {PackageDataComponent} from '../package-data.component';
import {ModalDirective} from 'ngx-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PopupService} from '../../../core/service/popup.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ScopeService} from '../../../core/service/scope.service';
import {PackageDraftService} from './package-draft.service';

@Component({
    selector: 'app-package-draft',
    templateUrl: './package-draft.component.html',
    styleUrls: ['./package-draft.component.css']
})
export class PackageDraftComponent extends PackageDataComponent implements OnInit {



    @ViewChild('usSendingModal') usSendingModal: ModalDirective;
    @ViewChild('mergeTracking') mergeTracking: ModalDirective;
    @ViewChild('sellerRefundModal') sellerRefundModal: ModalDirective;
    @ViewChild('updateModal') updateModal: ModalDirective;
    @ViewChild('viewLogTracking') viewLogTracking: ModalDirective;

    public tracks: any = [];
    public manifests: any = [];
    public showImageRow = -1;
    public productIds: any = [];
    public trackingUnknown = '';
    public trackingComplete = '';
    public trackingWast = '';
    public trackingMiss = '';
    public tabTracking = '';
    public code_view_log = '';
    public type_view_log = 'tracking';
    public trackingCodes: any = [];
    public p_m = 1;
    public p_u = 1;
    public p_w = 1;
    public p_c = 1;
    public l_m = 20;
    public l_u = 20;
    public l_w = 20;
    public l_c = 20;
    public limit_page = 9;
    public manifest_id = '';
    public trackingExt: any = [];
    public trackingMerge: any = {
        data: {},
        type: '',
    };
    public trackingTarget: any = {
        data: {},
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
    };
    // file
    public file: File;
    // form
    public usSendingForm: FormGroup;
    public searchForm: FormGroup;
    public trackingSellerMerge: any = {
        data_id: '',
        ext_id: '',
        data_tracking_code: '',
        ext_tracking_code: '',
        type: '',
    };
    public trackingMergeSearch: string | any;

    constructor(
        public packageService: PackageDraftService,
        public popUp: PopupService,
        public fb: FormBuilder,
        public sanitizer: DomSanitizer,
        public _scope: ScopeService
    ) {
        super(packageService, _scope);
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

    get listWarehouses(): any {
        const store = this.store;
        let listWarehouses = [
            {key: this.allKey, value: '--select store first--'}
        ];
        if (store === '') {
            listWarehouses = [
                {key: this.allKey, value: '--select store first--'}
            ];
        } else if (store === 'vn') {
            listWarehouses = [
                {key: 'BMVN_HN', value: 'Boxme Ha Noi (Nam tu liem)'},
                {key: 'BMVN_HCM', value: 'Boxme HCM (45 tan son)'},
            ];
        } else if (store === 'id') {
            listWarehouses = [
                {key: 'BMID_JKT', value: 'Boxme INDO (Jakata)'},
            ];
        } else {
            listWarehouses = [
                {key: this.allKey, value: '--select warehouse--'},
                {key: 'BMVN_HN', value: 'Boxme Ha Noi (Nam tu liem)'},
                {key: 'BMVN_HCM', value: 'Boxme HCM (45 tan son)'},
                {key: 'BMID_JKT', value: 'Boxme INDO (Jakata)'},
            ];
        }
        this.usSendingForm.patchValue({warehouse: listWarehouses[0].key});
        return listWarehouses;
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
        fd.append('warehouse', value.warehouse);
        fd.append('warehouse_us', value.warehouse_us);
        fd.append('manifest', value.manifest);
        fd.append('file', this.file);
        fd.append('date', value.date);
        return fd;
    }

    public create() {
        this.packageService.create(this.preCreate()).subscribe(res => {
            const rs: any = res;
            if (rs.success) {
                this.popUp.success(rs.message);
                this.usSendingModal.hide();
            } else {
                this.popUp.error(rs.message);
                // this.buildUsSendingForm();
            }
        });
    }

    public preSearch() {
        const value = this.searchForm.value;

        const params: any = {
            trackingC: this.trackingComplete,
            trackingW: this.trackingWast,
            trackingM: this.trackingMiss,
            trackingU: this.trackingUnknown,
            m: this.manifest_id,
            ps_ms: this.l_m,
            ps_u: this.l_u,
            ps_c: this.l_c,
            ps_w: this.l_w,
            p_ms: this.p_m,
            p_u: this.p_u,
            p_c: this.p_c,
            p_w: this.p_w,
            ps_m: value.perPage,
            p_m: value.page
        };
        if (value.q !== '') {
            params.q = value.q;
        }
        return params;
    }

    getTotalPageArray(total, limit, page) {
        const count = Math.ceil(total / limit);
        const arr = [];
        const tb = Math.ceil(this.limit_page / 2);
        for (let ind = 0; ind < count; ind++) {
            if (count > this.limit_page) {
                if (page <= tb) {
                    if (this.limit_page >= ind + 1) {
                        arr.push(ind + 1);
                    }
                } else {
                    if ((ind + 1 > page - tb && page + tb > ind + 1)) {
                        arr.push(ind + 1);
                    }
                }
            } else {
                arr.push(ind + 1);
            }
        }
        return arr;
    }

    getTotalPage(total, limit) {
        return Math.floor(total / limit);
    }
    search(type = 'search') {
        const params = this.preSearch();
        if (type === 'search') {
            params.m = '';
            this.manifest_id = '';
        }
        this.packageService.search(params).subscribe(response => {
            const rs: any = response;
            if (rs.success) {
                const data: any = rs.data;
                this.tracks = data._items;
                this.trackingExt = data._ext;
                if (type === 'search') {
                    this.manifests = data._manifest ? data._manifest : this.manifests;
                }
                this.totalCount = data._total_manifest ? data._total_manifest : this.totalCount;
                this.pageCount = Math.floor(this.totalCount / params.ps_m);
                this.currentPage = params.p_m;
                this.perPage = params.ps_m;
                this.setTabTracking('');
            } else {
                this.popUp.error(rs.message);
            }
        });
    }

    openUsSendingModal() {
        this.buildUsSendingForm();
        this.usSendingModal.show();
    }

    handleShowImageRow(row) {

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
    showMergeTracking(tracking) {
        this.trackingMerge = tracking;
        this.trackingTarget = '';
        this.mergeTracking.show();
    }

    merge(packTr, type) {
        if (!this.trackingMerge.type) {
            this.trackingMerge.data = packTr;
            this.trackingMerge.type = type;
        } else {
            this.trackingTarget.data = packTr;
            this.trackingTarget.type = type;
            const formMerge = {
                merge: this.trackingMerge,
                target: this.trackingTarget
            };
            this.packageService.popup.confirm(() => {
                this.packageService.merge(formMerge).subscribe(rs => {
                    const res: any = rs;
                    if (res.success) {
                        this.popUp.success(res.message);
                        this.search('tracking');
                    }
                });
            }, this.trackingMerge.data.tracking_code + ' merge ' + this.trackingTarget.data.tracking_code, 'Merge');
            this.clearMerge();
        }
    }

    clearMerge() {
        this.trackingMerge = {
            data: {},
            type: '',
        };
        this.trackingTarget = {
            data: {},
            type: '',
        };
    }

    mapUnknown(id, tracking_code) {
        this.popUp.confirm(() => {
            this.packageService.mapUnknown(id, {product_id: this.productIds[id]}).subscribe(rs => {
                const res: any = rs;
                if (res.success) {
                    this.popUp.success(res.message);
                    this.search('tracking');
                } else {
                    this.popUp.error(res.message);
                }
            });
        }, 'Do you want map product id ' + this.productIds[id] + ' for tracking ' + tracking_code, 'Map');
    }

    splitTracking(packTr) {
        if (!packTr.tracking_merge) {
            this.popUp.error('Sorry. Cannot split it!');
        }
        const arr = packTr.tracking_merge.split(',');
        if (arr.length <= 1) {
            this.popUp.error('Sorry. Cannot split it!');
        }
        let missing = arr[0];
        const wasting = arr[1];

        if (arr.length > 2) {
            for (let ind = 0; ind < arr.length; ind++) {
                if (ind > 1) {
                    missing = missing + ', ' + arr[ind];
                }
            }
        }
        this.popUp.confirm(
            () => {
                this.packageService.delete('s-tracking-code/' + packTr.id).subscribe(rs => {
                    if (rs) {
                        this.popUp.success(rs.message);
                        this.search('tracking');
                    } else {
                        this.popUp.error(rs.message);
                    }
                });
            },
            'Do you want split it! And tracking: ' +
            '' + missing + ' to Missing tracking. And tracking: ' +
            '' + wasting + ' to Wasting tracking.', 'split'
        );
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
        this.packageService.sellerRefund(this.sellerRefundForm.id, this.sellerRefundForm).subscribe(rs => {
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

    markHoldTracking(id, hold) {
        this.popUp.confirm(
            () => {
                this.packageService.markHold(id, {hold : hold}).subscribe(rs => {
                    const res: any = rs;
                    if (res.success) {
                        this.popUp.success(res.message);
                        this.search('tracking');
                    } else {
                        this.popUp.error(res.message);
                    }
                });
            },
            hold ? 'Hold tracking?' : 'UnHold tracking?', 'hold'
        );
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
        this.packageService.update(this.updateForm.id, this.updateForm).subscribe(rs => {
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
        if (this.tabTracking === tab) {
            this.tabTracking = '';
        } else {
            this.tabTracking = tab;
            switch (tab) {
                case 'complete':
                    this.trackingCodes = this.tracks.draftPackageItems;
                    break;
                case 'wasting':
                    this.trackingCodes = this.tracks.draftWastingTrackings;
                    break;
                case 'missing':
                    this.trackingCodes = this.tracks.draftMissingTrackings;
                    break;
                case 'unknown':
                    this.trackingCodes = this.tracks.unknownTrackings;
                    break;
                default:
                    this.trackingCodes = [];
                    break;
            }
        }
    }

    exportExcel(id) {
        this.packageService.get('us-sending/' + id).subscribe(
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
    regetType(id) {
        this.packageService.reGetType(id, {}).subscribe(rs => {
            if (rs.success) {
                this.popUp.success(rs.message);
                // this.search();
            } else {
                this.popUp.error(rs.message);
            }
        });
    }
    mergeTrackingEvent(event, type) {
        this.trackingSellerMerge.data_tracking_code = event.tracking_code;
        this.trackingSellerMerge.data_id = event.id;
        this.trackingSellerMerge.type = type;
        this.mergeTracking.show();
    }
    getExtTrackings(type = 'search') {
        let rs = this.trackingExt;
        if (this.trackingMerge.ext_tracking_code || this.trackingMergeSearch) {
            const match = type === 'search' ? this.trackingMergeSearch : this.trackingMerge.ext_tracking_code;
            rs = this.trackingExt.filter(
                c => c.tracking_code.toUpperCase().indexOf(match.toUpperCase()) !== -1);
            // console.log(rs);
        }
        return rs;
    }
    mergeTackingSeller() {
        const listCheck = this.getExtTrackings('tracking');
        if (!listCheck || listCheck === []) {
            return this.popUp.error('Cannot find tracking code target!');
        }
        this.popUp.confirm(() => {
            this.packageService.post('s-us-send', this.trackingSellerMerge).subscribe(rs => {
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
        }, this.trackingSellerMerge.data_tracking_code + ' merge ' + this.trackingSellerMerge.ext_tracking_code, 'Merge');
    }
    setTrackingTarget(id, tracking) {
        this.trackingSellerMerge.ext_tracking_code = tracking;
        this.trackingSellerMerge.ext_id = id;
    }
    mapUnknownUs(id, tracking_code) {
        this.packageService.popup.confirm(() => {
            this.packageService.mapUnknownUS(id, {product_id: this.productIds[id]}).subscribe(rs => {
                const res: any = rs;
                if (res.success) {
                    this.packageService.popup.success(res.message);
                    this.search();
                } else {
                    this.packageService.popup.error(res.message);
                }
            });
        }, 'Do you want map product id ' + this.productIds[id] + ' for tracking ' + tracking_code, 'Map');
    }
    viewLog(event) {
        this.code_view_log = event.code;
        this.type_view_log = event.type;
        this.viewLogTracking.show();
    }
}
