import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsDaterangepickerConfig, ModalDirective} from 'ngx-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PopupService} from '../../../core/service/popup.service';
import {ShipmentService} from '../shipment.service';
import {ShipmentDataComponent} from '../shipment-data.component';

import {response} from '../mock-response';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.css']
})
export class ShipmentListComponent extends ShipmentDataComponent implements OnInit {

  @ViewChild(ModalDirective) shipmentCreateModal: ModalDirective;
  @ViewChild(ModalDirective) updateReceiverModal: ModalDirective;

  public shipments: any = [];
  public shipment: any = {};
  public couriers: any = [];

  // meta
  public totalCount: number;
  public pageCount: number;
  public currentPage: number;
  public perPage: number;
  // form Group
  public searchForm: FormGroup;
  public createFrom: FormGroup;
  public dateTime: Date;
  public bsRangeValue: Date[];
  public bsConfig: BsDaterangepickerConfig;
  public address: any = {
    receiver_name: '',
    receiver_email: '',
  };

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
    this.loadWarehouse();
    this.buildSearchForm();
    this.search();
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
    const data: any = response.data;
    this.shipments = data._items;
    this.totalCount = data._meta.totalCount;
    this.pageCount = data._meta.pageCount;
    this.currentPage = data._meta.currentPage;
    this.perPage = data._meta.perPage;
    // this.shipmentService.search(params).subscribe(response => {
    //   const result: any = response;
    //   if (result.success) {
    //     const data: any = result.data;
    //     this.shipments = data._items;
    //     this.totalCount = data._meta.totalCount;
    //     this.pageCount = data._meta.pageCount;
    //     this.currentPage = data._meta.currentPage;
    //     this.perPage = data._meta.perPage;
    //   } else {
    //     this.popup.error(result.message);
    //   }
    // });
    console.log(this.shipments.length);
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

  buildCreateForm(shipment: any | null) {
    this.createFrom = this.fb.group({
      warehouse: shipment ? shipment.warehouse_send_id : this.defaultWarehouse(),
      receiver_name: shipment ? shipment.receiver_name : '',
      receiver_phone: shipment ? shipment.receiver_phone : '',
      receiver_address: shipment ? shipment.receiver_address : '',
      receiver_post_code: shipment ? shipment.receiver_post_code : '',
      receiver_post_code: shipment ? shipment.receiver_post_code : '',
      receiver_country_id: shipment ? shipment.receiver_post_code : '',
      receiver_province_id: shipment ? shipment.receiver_post_code : '',
      receiver_district_id: shipment ? shipment.receiver_post_code : '',
      parcels: {}
    });
  }

  defaultWarehouse() {
    return this.allKey;
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


  activeCreateShipment(s) {
    this.shipment = s;
    console.log(this.shipment);
    this.shipmentCreateModal.show();
  }

  createShipment() {

  }

  suggetsCourier() {

  }

  cancelShipment(){

  }
}
