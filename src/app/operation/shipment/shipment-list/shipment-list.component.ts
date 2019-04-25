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
  public rules: any;

  public selectedList: any = [];
  public isRemove = false;
  public currentStatus: string;
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
      price: packageItem.price,
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
      courier_code: shipment ? shipment.courier_code : '',
      total_shipping_fee: shipment ? shipment.total_shipping_fee : '',
      courier_logo: shipment ? shipment.courier_logo : '',
      courier_estimate_time: shipment ? shipment.courier_estimate_time : '',
      is_hold: shipment ? shipment.is_hold : 0,
      is_insurance: shipment ? shipment.is_insurance : 0,
      shipment_status: shipment ? shipment.shipment_status : 'NEW',
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

  countSelectedList() {
    return this.selectedList.length;
  }

  isInSelectedList(id) {
    if (this.selectedList.length === 0) {
      return false;
    }
    return this.selectedList.filter(selected => selected.id === id).length > 0;
  }

  isValidSelectedList(checkStatus: any | null) {
    if (this.countSelectedList() === 0) {
      return false;
    }
    if (checkStatus !== null) {
      for (let idx = 0; idx < this.selectedList.length; idx++) {
        if (this.selectedList[idx].status !== checkStatus) {
          return false;
        }
      }
    } else {
      if (this.selectedList.length < 2) {
        return true;
      }
      checkStatus = this.selectedList[0].status;
      for (let idx = 1; idx < this.selectedList.length; idx++) {
        if (this.selectedList[idx].status !== checkStatus) {
          return false;
        }
      }
    }
    return true;
  }

  checkboxName(item) {
    return 'shipmentCheckbox' + item.id;
  }

  removeFromList(item) {
    this.selectedList = this.selectedList.filter(selected => selected.id !== item.id);
    return this.selectedList;
  }

  addToList(item) {
    if (this.selectedList.length === 0) {
      this.selectedList.push(item);
    } else if (this.isInSelectedList(item.id)) {
      this.selectedList = this.removeFromList(item);
    } else {
      this.selectedList.push(item);
    }
  }

  onSelectAll() {
    this.isRemove = !this.isRemove;
    for (let idx = 0; idx < this.shipments.length; idx++) {
      const raw = this.shipments[idx];
      const item = {id: raw.id, status: raw.shipment_status};
      if ((!this.isInSelectedList(item.id) && this.isRemove) || (this.isInSelectedList(item.id) && !this.isRemove)) {
        this.addToList(item);
      }
    }
  }

  onSelect(item) {
    const selected = {id: item.id, status: item.shipment_status};
    this.currentStatus = selected.status;
    this.addToList(selected);
  }

  get parcels(): FormArray {
    return this.createFrom.get('parcels') as FormArray;
  }

  get courierCode(): string {
    return this.createFrom.get('courier_code').value;
  }

  get formShipmentStatus() {
    const status = this.createFrom.get('shipment_status').value;
    return this.isCanCreate(status);
  }

  get getCalculate(): any {
    const shipFee = this.createFrom.get('total_shipping_fee').value;
    let totalCod = 0;
    let totalAmount = 0;
    let i = 0;
    for (i; i < this.parcels.controls.length; i++) {
      const parcel = this.parcels.controls[i];
      totalCod += Number(parcel.get('cod').value);
      totalAmount += Number(parcel.get('price').value);
    }
    const final = shipFee + totalCod + totalAmount;
    return {
      total_shipping_fee: shipFee,
      totalCod: totalCod,
      totalAmount: totalAmount,
      final: final
    };
  }

  public isCanCreate(status) {
    const list = ['NEW'];
    return list.indexOf(status) !== -1;
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
      toProvince: Number(this.createFrom.get('receiver_province_id').value),
      toCountry: Number(this.createFrom.get('receiver_country_id').value),
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

  merge() {
    const listIds = [];
    for (let i = 0; i < this.selectedList.length; i++) {
      listIds.push(this.selectedList[i].id);
    }
    this.shipmentService.post('s/m', {ids: listIds}).subscribe(res => {
          console.log(res);
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
    this.shipmentService.post('courier/create', this.createFrom.getRawValue()).subscribe(response => {
      console.log(response);
    });
  }

  updateShipment() {
    const formValue = this.createFrom.getRawValue();
    this.shipmentService.post('s/' + formValue.id, formValue).subscribe(response => {
      console.log(response);
    });
  }

  getSafeImage(parcel: any | FormGroup) {
    if (typeof parcel === 'object') {
      let src = parcel.get('image').value;
      return this.sanitizer.bypassSecurityTrustResourceUrl(src);
    }
  }

  suggestCourier() {
    this.buildCalculateFrom();
    this.setActiveCourier(null);
    const params = this.calculateFrom.getRawValue();
    this.shipmentService.post('courier/suggest', params).subscribe(res => {
      this.couriers = res;
      if (this.couriers.error === false && this.couriers.data.couriers.length > 0) {
        const c = this.couriers.data.couriers[0];
        if (typeof c !== 'undefined' && this.courierCode === '') {
          this.setActiveCourier(c);
        }
      }
    });
  }

  setActiveCourier(c: any | null) {
    this.createFrom.patchValue({
      courier_code: c ? c.service_code : '',
      total_shipping_fee: c ? c.total_fee : 0,
      courier_logo: c ? c.courier_logo : '',
      courier_estimate_time: c ? (c.min_delivery_time + '-' + c.max_delivery_time) : '',
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

  onSelectCourier(c) {
    this.setActiveCourier(c);
  }

  removePackageItem(id) {
    this.shipmentService.get('s/r/' + id).subscribe(res => {
      console.log(res);
    });
  }

  cancelShipment() {

  }
}
