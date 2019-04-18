import {Component, OnInit, ViewChild} from '@angular/core';
import {TrackingExtensionService} from './tracking-extension.service';
import {TrackingDataComponent} from '../tracking-data.component';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
    selector: 'app-tracking-extension',
    templateUrl: './tracking-extension.component.html',
    styleUrls: ['./tracking-extension.component.css']
})
export class TrackingExtensionComponent extends TrackingDataComponent implements OnInit {

    @ViewChild('usReveicedModal') usReveicedModal: ModalDirective;

    constructor(public service: TrackingExtensionService) {
        super(service);
    }

    public filter: any = {
        orderCode: '',
        orderId: '',
        trackingCode: '',
        sku: '',
        purchaseInvoice: '',
        manifestCode: '',
        packageCode: '',
        status: ''
    };

    public markUsReveicedModel: any = {
        trackingCode: '',
        warehouse: '',
        purchaseInvoice: '',
        time: ''
    };
    public warehouse: any;
    public data: any;

    ngOnInit() {
        this.getList();
        this.getwarehouse(true);
    }

    clearForm() {
        this.filter = {
            orderCode: '',
            orderId: '',
            trackingCode: '',
            sku: '',
            purchaseInvoice: '',
            manifestCode: '',
            packageCode: '',
            status: ''
        };
    }

    getList() {
        const fd = {
            page: this.currentPage,
            limit: this.perPage,
            filter: this.filter,
        };
        this.service.post('ext-tracking', fd).subscribe(rs => {
            const res: any = rs;
            if (res.success) {
                this.data = res.data.data;
                this.pageCount = res.data.totalPage;
                this.currentPage = res.data.page;
                this.totalCount = res.data.total;
                this.service.popup.success('Success');
            }
        });
    }

    handlePagination(event) {
        this.currentPage = event.page;
        this.perPage = event.itemsPerPage;
        this.getList();
    }

    getwarehouse(nocache = false) {
        this.warehouse = nocache ? null : JSON.parse(this.service.encryption.decrypt('list_warehouse'));
        if (!this.warehouse) {
            this.service.get('warehouse', undefined).subscribe(rs => {
                const res: any = rs;
                if (res.success) {
                    this.warehouse = res.data;
                    this.service.encryption.encrypt('list_warehouse', JSON.stringify(this.warehouse));
                } else {
                    this.service.encryption.encrypt('list_warehouse', null);
                }
            });
        }
    }

    markUsReveiced() {
        if (this.markUsReveicedModel.time &&
            this.markUsReveicedModel.trackingCode &&
            this.markUsReveicedModel.warehouse &&
            this.markUsReveicedModel.purchaseInvoice
        ) {
            this.service.popup.warning(
                this.service.post('ext-tracking/create', this.markUsReveicedModel).subscribe(rs => {
                    const res: any = rs;
                    if (res.success) {
                        this.service.popup.success(res.message);
                    }
                }), 'Do you want do it?'
            );
        } else {
            this.service.popup.error('Please fill all field!');
        }
    }
}
