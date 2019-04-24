import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsDaterangepickerConfig, ModalDirective} from 'ngx-bootstrap';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {PopupService} from '../../../core/service/popup.service';
import {ShipmentService} from '../shipment.service';
import {ShipmentDataComponent} from '../shipment-data.component';
import {DomSanitizer} from '@angular/platform-browser';
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
  public couriers: any = {};

  // meta
  public totalCount: number;
  public pageCount: number;
  public currentPage: number;
  public perPage: number;
  // form Group
  public searchForm: FormGroup;
  public createFrom: FormGroup;
  public calculateFrom: FormGroup;

  public dateTime: Date;
  public bsRangeValue: Date[];
  public bsConfig: BsDaterangepickerConfig;
  public address: any = {
    receiver_name: '',
    receiver_email: '',
  };

  constructor(
    public shipmentService: ShipmentService,
    private popup: PopupService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
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
    this.buildCreateForm(null);
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
    // const data: any = response.data;
    // this.shipments = data._items;
    // this.totalCount = data._meta.totalCount;
    // this.pageCount = data._meta.pageCount;
    // this.currentPage = data._meta.currentPage;
    // this.perPage = data._meta.perPage;
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

    const parcels = shipment ? shipment.packageItems.map(packageItem => this.fb.group({
        id: packageItem.id,
        product_id: packageItem.product.id,
        image: packageItem.product.link_img,
        name: packageItem.product.product_name,
        dimension_l: packageItem.dimension_l,
        dimension_w: packageItem.dimension_w,
        dimension_h: packageItem.dimension_h,
        weight: packageItem.weight,
        quantity: packageItem.quantity,
        cod: packageItem.cod,
        price: packageItem.price
    })) : [];
    this.createFrom = this.fb.group({
      id: shipment ? shipment.id : '',
      warehouse_send_id: shipment ? shipment.warehouse_send_id : this.defaultWarehouse(),
      receiver_name: shipment ? shipment.receiver_name : '',
      receiver_phone: shipment ? shipment.receiver_phone : '',
      receiver_address: shipment ? shipment.receiver_address : '',
      receiver_post_code: shipment ? shipment.receiver_post_code : '',
      receiver_country_id: shipment ? shipment.receiver_country_id : '',
      receiver_province_id: shipment ? shipment.receiver_province_id : '',
      receiver_district_id: shipment ? shipment.receiver_district_id : '',
      is_hold: shipment ? shipment.is_hold : 0,
      is_insurance: shipment ? shipment.is_insurance : 0,
      parcels: parcels.length > 0 ? this.fb.array(parcels) : this.fb.array([
          this.fb.group({id: '', product_id: '', image: '', name: '', dimension_l: '', dimension_w: '', dimension_h: '', weight: '', quantity: '', cod: '', price: ''})
      ])
    });
  }

  get parcels(): FormArray {
      return this.createFrom.get('parcels') as FormArray;
  }

  buildCalculateFrom(shipment: any | null) {
    if (shipment === null && this.shipment !== null) {
      shipment = this.shipment;
    }
    this.couriers = [];
    this.calculateFrom = this.fb.group({
      warehouseId: shipment ? shipment.warehouse_send_id : '',
      toAddress: shipment ? shipment.receiver_address : '',
      toDistrict: shipment ? shipment.receiver_district_id : '',
      toProvince: shipment ? shipment.receiver_province_id : '',
      toCountry: shipment ? shipment.receiver_country_id : '',
      toZipCode: shipment ? shipment.receiver_post_code : '',
      toName: shipment ? shipment.receiver_name : '',
      toPhone: shipment ? shipment.receiver_phone : '',
      totalParcel: shipment ? shipment.packageItems.length : 0,
      totalWeight: shipment ? shipment.total_weight : 0,
      totalQuantity: shipment ? shipment.total_quantity : 0,
      totalCod: shipment ? shipment.total_cod : 0,
      totalAmount: shipment ? shipment.total_price : 0,
      isInsurance: shipment ? (shipment.is_insurance === 1 ? 'Y' : 'N') : 'N',
      sortMode: 'best_price'
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
    this.buildCreateForm(s);
    console.log(this.createFrom.getRawValue());
    this.buildCalculateFrom(s);
    this.suggestCourier();
    this.shipmentCreateModal.show();
  }

  createShipment() {
  }

  getSafeImage(parcel: any | FormGroup) {
    if (typeof parcel === 'object') {
      let src = parcel.get('image').value;
      console.log(parcel.getRawValue());
      return this.sanitizer.bypassSecurityTrustResourceUrl(src);
    }
  }

  suggestCourier() {
    const params = this.calculateFrom.getRawValue();
    this.shipmentService.post('courier/suggest', params).subscribe(res => {
      this.couriers = res;
    });
  }

  isValidCourier() {
    return typeof this.couriers === 'object' && this.couriers.error == false && this.couriers.data.length > 0;
  }

  cancelShipment() {

  }
}
