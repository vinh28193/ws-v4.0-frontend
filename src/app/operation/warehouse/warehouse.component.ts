import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupService} from '../../core/service/popup.service';
import {OperationDataComponent} from '../operation-data.component';
import {OperationService} from '../operation.service';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
    selector: 'app-warehouse',
    templateUrl: './warehouse.component.html',
    styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent extends OperationDataComponent implements OnInit {

    constructor(public service: OperationService, public POP: PopupService) {
        super(service);
    }

    @ViewChild('createNewTracking') createNewTracking: ModalDirective;
    public createForm: any = {
        tracking_codes: '',
        time_received: '',
    };
    public searchInput: any = {
        trackingCode: '',
        manifestCode: '',
        shipmentCode: '',
        packageCode: '',
        WsTrackingCode: '',
        tabFilter: '',
        limit: 20,
        page: 1
    };
    public data: any = [];

    ngOnInit() {
        this.clearSearch();
        this.search();
    }

    clearSearch() {
        this.searchInput = {
            trackingCode: '',
            manifestCode: '',
            shipmentCode: '',
            packageCode: '',
            WsTrackingCode: '',
            tabFilter: '',
            limit: 20,
            page: 1
        };
        this.search();
    }

    getFilterTab(tab) {
        if (tab !== this.searchInput.tabFilter) {
            this.searchInput.tabFilter = tab;
            this.search();
        }
    }
    search() {
        this.searchInput.limit = this.perPage;
        this.searchInput.page = this.currentPage;
        this.service.get('warehouse-ws', this.searchInput).subscribe(rs => {
            if (rs.success) {
                this.data = rs.data.data;
                this.totalCount = rs.data.total;
            }
        });
    }

    createNew() {
        this.createNewTracking.show();
    }

    MarkUsReceived() {
        if (!this.createForm.tracking_codes || !this.createForm.time_received) {
            return this.POP.error('Tracking Code and Time Received cannot null!');
        }
        this.service.post('warehouse-ws', this.createForm).subscribe(res => {
            const rs: any = res;
            if (rs.success) {
                // this.data = rs.data.data;
                this.POP.success(rs.message);
                this.search();
            } else {
                this.POP.error(rs.message);
            }
        });
    }

    exportReport() {
        this.POP.success('Click export report tracking');
    }

    handlePagination(event) {
        this.currentPage = event.page;
        this.search();
    }
}
