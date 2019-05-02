import {Component, OnInit} from '@angular/core';
import {PopupService} from '../../core/service/popup.service';
import {OperationDataComponent} from '../operation-data.component';
import {OperationService} from '../operation.service';

@Component({
    selector: 'app-warehouse',
    templateUrl: './warehouse.component.html',
    styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent extends OperationDataComponent implements OnInit {

    constructor(public service: OperationService, public POP: PopupService) {
        super(service);
    }

    public searchInput: any = {
        trackingCode: '',
        manifestCode: '',
        shipmentCode: '',
        packageCode: '',
        WsTrackingCode: '',
        tabFilter: ''
    };
    public data: any = [];

    ngOnInit() {
        this.clearSearch();
    }

    clearSearch() {
        this.searchInput = {
            trackingCode: '',
            manifestCode: '',
            shipmentCode: '',
            packageCode: '',
            WsTrackingCode: '',
            tabFilter: ''
        };
    }

    getFilterTab(tab) {
        if (tab !== this.searchInput.tabFilter) {
            this.searchInput.tabFilter = tab;
            this.search();
        }
    }

    search() {
        console.log(this.searchInput);
        this.service.get('warehouse-ws', this.searchInput).subscribe(rs => {
            console.log(rs);
            if (rs.success) {
                this.data = rs.data;
                this.POP.success('Get success');
            }
        });
    }

    createNew() {
        this.POP.success('Click create new tracking', 'Success');
    }

    exportReport() {
        this.POP.success('Click export report tracking');
    }
}
