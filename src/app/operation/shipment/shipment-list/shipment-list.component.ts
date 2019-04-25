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

  loadShipmentLocation(s: any | null) {
    this.provinces = [];
    this.districts = [];
    if (s) {
      this.country = s.receiver_country_id;
      this.province = s.receiver_country_id;
      this.district = s.receiver_district_id;
    } else {
      this.country = Number(this.createFrom.get('receiver_country_id').value);
      this.province = Number(this.createFrom.get('receiver_province_id').value);
      this.district = Number(this.createFrom.get('receiver_district_id').value);
    }
    this.getDistricts();

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
        this.fb.group({
          id: '',
          product_id: '',
          image: '',
          name: '',
          dimension_l: '',
          dimension_w: '',
          dimension_h: '',
          weight: '',
          quantity: '',
          cod: '',
          price: ''
        })
      ])
    });
  }

  get parcels(): FormArray {
    return this.createFrom.get('parcels') as FormArray;
  }

  buildCalculateFrom() {
    this.couriers = [];
    let totalQuantity = 0;
    let totalWeight = 0;
    let totalCod = 0;
    let totalAmount = 0;
    let i = 0;
    for (i; i < this.parcels.controls.length; i++) {
      const parcel = this.parcels.controls[i];
      totalQuantity += Number(parcel.get('quantity').value);
      totalWeight += Number(parcel.get('weight').value);
      totalCod += Number(parcel.get('cod').value);
      totalAmount += Number(parcel.get('price').value);
    }
    this.calculateFrom = this.fb.group({
      warehouseId: this.createFrom.get('warehouse_send_id').value,
      toAddress: this.createFrom.get('receiver_address').value,
      toDistrict: Number(this.createFrom.get('receiver_district_id').value),
      toProvince:  Number(this.createFrom.get('receiver_province_id').value),
      toCountry:  Number(this.createFrom.get('receiver_country_id').value),
      toZipCode: this.createFrom.get('receiver_post_code').value,
      toName: this.createFrom.get('receiver_name').value,
      toPhone: this.createFrom.get('receiver_phone').value,
      totalParcel: i,
      totalWeight: String(totalWeight),
      totalQuantity: totalQuantity,
      totalCod: totalCod,
      totalAmount: String(totalAmount),
      isInsurance: this.createFrom.get('is_insurance').value,
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
    this.loadShipmentLocation(s);
    this.buildCalculateFrom();
    this.suggestCourier();
    this.shipmentCreateModal.show();
  }

  createShipment() {
  }

  getSafeImage(parcel: any | FormGroup) {
    if (typeof parcel === 'object') {
      let src = parcel.get('image').value;
      return this.sanitizer.bypassSecurityTrustResourceUrl(src);
    }
  }

  suggestCourier() {
    this.buildCalculateFrom();
    const params = this.calculateFrom.getRawValue();
    this.shipmentService.post('courier/suggest', params).subscribe(res => {
      this.couriers = res;
    });
  }

  changeValueForm(control, group: any | null, idx = 0, refreshCourier = false) {

    if (control === 'receiver_country_id' || control === 'receiver_province_id') {
      if (control === 'receiver_country_id') {
        this.createFrom.patchValue({
          'receiver_district_id': '',
          'receiver_province_id': '',
        });
      } else if (control === 'receiver_province_id') {
        this.createFrom.patchValue({
          'receiver_district_id': '',
        });
      }
      this.loadShipmentLocation(null);
      // this.shipment[control] = this.createFrom.get(control).value;
    } else if (group !== null) {
      // this.shipment.packageItems[idx][control] = group.get(control).value;
    }
    if (refreshCourier) {
      this.suggestCourier();
    }
  }

  isValidCourier() {
    return typeof this.couriers === 'object' && this.couriers.error === false && this.couriers.data.length > 0;
  }

  cancelShipment() {

  }
}
