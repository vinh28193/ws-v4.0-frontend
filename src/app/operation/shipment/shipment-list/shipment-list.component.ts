import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsDaterangepickerConfig} from 'ngx-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PopupService} from '../../../core/service/popup.service';
import {ShipmentService} from '../shipment.service';
import {ShipmentDataComponent} from '../shipment-data.component';

@Component({
    selector: 'app-shipment-list',
    templateUrl: './shipment-list.component.html',
    styleUrls: ['./shipment-list.component.css']
})
export class ShipmentListComponent extends ShipmentDataComponent implements OnInit {

    @ViewChild('shipmentListTemplate') shipmentListTemplate: TemplateRef<any>;

    @ViewChild('shipmentParcelListTemplate') shipmentParcelListTemplate: TemplateRef<any>;
    @ViewChild('shipmentParcelCreateTemplate') shipmentParcelCreateTemplate: TemplateRef<any>;


    public shipments: any = [];

    // meta
    public totalCount: number;
    public pageCount: number;
    public currentPage: number;
    public perPage: number;
    // form Group
    public searchForm: FormGroup;
    public createFrom: FormGroup;
    // Template
    public toggleShipmentTemplate: TemplateRef<any>;

    public toggleParcelTemplate: TemplateRef<any>;
    public dateTime: Date;
    public bsRangeValue: Date[];
    public bsConfig: BsDaterangepickerConfig;

    constructor(public shipmentService: ShipmentService, private popup: PopupService, private fb: FormBuilder) {
        super(shipmentService);
    }

    ngOnInit() {
        this.currentPage = 1;
        this.perPage = 20;
        this.dateTime = new Date();
        const maxDateTime: Date = this.dateTime;
        maxDateTime.setDate(this.dateTime.getDate() + 1);
        this.bsRangeValue = [this.dateTime, maxDateTime];
        this.buildSearchForm();
        this.search();
        this.toggleShipmentTemplate = this.shipmentListTemplate;
        this.toggleParcelTemplate = this.shipmentParcelListTemplate;
    }

    prepareSearch() {
        const value = this.searchForm.value;

        const params: any = {};
        if (value.keyWord !== '') {
            params.q = value.keyWord;
            params.qref = value.keyCategory;
        }
        if (value.currentStatus !== 'ALL') {
            params.s = value.currentStatus;
        }
        if (value.timeRange.length > 0 && (value.timeRange[0] !== '' || value.timeRange[1] !== '')) {

        }
        params.prep = value.perPage;
        params.p = value.page;
        return params;
    }

    search() {
        const params = this.prepareSearch();
        this.shipmentService.search(params).subscribe(response => {
            const result: any = response;
            if (result.success) {
                const data: any = result.data;
                this.shipments = data._items;
                this.totalCount = data._meta.totalCount;
                this.pageCount = data._meta.pageCount;
                this.currentPage = data._meta.currentPage;
                this.perPage = data._meta.perPage;
            } else {
                this.popup.error(result.message);
            }
        });
        console.log(this.shipments);
    }

    buildSearchForm() {
        this.searchForm = this.fb.group({
            keyCategory: 'ALL',
            keyWord: '',
            timeKey: 'create_at',
            timeRange: this.bsRangeValue,
            currentStatus: 'ALL',
            page: this.currentPage,
            perPage: this.perPage,
        });
    }

    pullParcelData(shipment) {
        const items = shipment.packageItems;
        // for (const item of items) {
        //     console.log(item);
        // }
        return {
            parcels: items,
            totalParcel: items.length,
            totalWeight: shipment.total_weight,
            totalQuantity: shipment.total_quantity,
            totalCod: shipment.total_cod,
            totalPrice: shipment.total_price,
            courier: {
                code: shipment.courier_code,
                logo: shipment.courier_logo,
                estimate: {from: 1, to: 2}
            }
        };
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

    consoleLog(value){
       ;
    }
}
