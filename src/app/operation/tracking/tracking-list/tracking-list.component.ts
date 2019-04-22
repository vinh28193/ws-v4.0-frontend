import {Component, OnInit, ViewChild} from '@angular/core';
import {TrackingDataComponent} from '../tracking-data.component';
import {TrackingService} from '../tracking.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PopupService} from '../../../core/service/popup.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
    selector: 'app-tracking-list',
    templateUrl: './tracking-list.component.html',
    styleUrls: ['./tracking-list.component.css']
})
export class TrackingListComponent extends TrackingDataComponent implements OnInit {


    @ViewChild('usSendingModal') usSendingModal: ModalDirective;
    @ViewChild('mergeTracking') mergeTracking: ModalDirective;

    public tracks: any = [];
    public manifests: any = [];
    public showImageRow = -1;
    public productIds: any = [];
    public trackingUnknown = '';
    public trackingComplete = '';
    public trackingWast = '';
    public trackingMiss = '';
    public trackingMerge: any = {
        data: {},
        type: '',
    };
    public trackingTarget: any = {
        data: {},
        type: '',
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
        public sanitizer: DomSanitizer
    ) {
        super(trackingService);
    }

    ngOnInit() {
        this.currentPage = 1;
        this.perPage = 20;
        this.buildSearchForm();
        this.buildUsSendingForm();
        this.search();
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
            file: ['']
        });
    }

    get store(): string {
        return this.usSendingForm.get('store').value;
    }

    get warehouses(): any {
        const store = this.store;
        let warehouses = [
            {key: this.allKey, value: '--select store first--'}
        ];
        if (store === '') {
            warehouses = [
                {key: this.allKey, value: '--select store first--'}
            ];
        } else if (store === 'vn') {
            warehouses = [
                {key: 'BMVN_HN', value: 'Boxme Ha Noi (Nam tu liem)'},
                {key: 'BMVN_HCM', value: 'Boxme HCM (45 tan son)'},
            ];
        } else if (store === 'id') {
            warehouses = [
                {key: 'BMID_JKT', value: 'Boxme INDO (Jakata)'},
            ];
        } else {
            warehouses = [
                {key: this.allKey, value: '--select warehouse--'},
                {key: 'BMVN_HN', value: 'Boxme Ha Noi (Nam tu liem)'},
                {key: 'BMVN_HCM', value: 'Boxme HCM (45 tan son)'},
                {key: 'BMID_JKT', value: 'Boxme INDO (Jakata)'},
            ];
        }
        this.usSendingForm.patchValue({warehouse: warehouses[0].key});
        return warehouses;
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
        fd.append('manifest', value.manifest);
        fd.append('file', this.file);
        return fd;
    }

    public create() {
        this.trackingService.create(this.preCreate()).subscribe(res => {
            console.log(' us sending ' + JSON.stringify(res));
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
            trackingC: this.trackingComplete,
            trackingW: this.trackingWast,
            trackingM: this.trackingMiss,
            trackingU: this.trackingUnknown,
            ps: value.perPage,
            p: value.page
        };
        if (value.q !== '') {
            params.q = value.q;
        }
        return params;
    }

    search(type = 'search') {
        const params = this.preSearch();
        this.trackingService.search(params).subscribe(response => {
            const rs: any = response;
            if (rs.success) {
                const data: any = rs.data;
                this.tracks = data._items;
                if (type !== 'tracking') {
                    this.manifests = data._manifest ? data._manifest : this.manifests;
                }
                this.totalCount = data._meta.totalCount ? data._meta.totalCount : this.totalCount;
                this.pageCount = data._meta.pageCount ? data._meta.pageCount : this.pageCount;
                this.currentPage = data._meta.currentPage ? data._meta.currentPage : this.currentPage;
                this.perPage = data._meta.perPage ? data._meta.perPage : this.perPage;
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

    getListImage(images) {
        if (images) {
            return images.split(',');
        }
        return false;
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
            this.trackingService.popup.confirm(() => {
                this.trackingService.merge(formMerge).subscribe(rs => {
                    const res: any = rs;
                    if (res.success) {
                        this.popUp.success(res.message);
                        this.search('tracking');
                    }
                });
            }, this.trackingMerge.data.tracking_code + ' merge ' + this.trackingTarget.data.tracking_code, 'Merge');
            this.clearMerge();
        }
        console.log(this.trackingMerge);
        console.log(this.trackingTarget);
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
    mapUnknown(id){

    }
}
