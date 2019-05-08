import {Component, OnInit, ViewChild} from '@angular/core';
import {OperationDataComponent} from '../operation-data.component';
import {OperationService} from '../operation.service';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-delivery-note',
  templateUrl: './delivery-note.component.html',
  styleUrls: ['./delivery-note.component.css']
})
export class DeliveryNoteComponent extends OperationDataComponent implements OnInit {
  @ViewChild('insertTrackingModal') insertTrackingModal: ModalDirective;
  public data: any;
  // private total = 0;
  public checkAllOld = false;
  public checkBoxs: any = [];
  public listChoose: any = [];
  public listPackages: any = [];
  public formCreate: any = {
    customer_id: '',
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    price: 0,
    cod: 0,
    warehouse_pickup: '',
    receiver_name: '',
    receiver_email: '',
    receiver_phone: '',
    receiver_district_name: '',
    receiver_district_id: '',
    receiver_province_id: '',
    receiver_province_name: '',
    receiver_country_name: '',
    receiver_country_id: '',
    receiver_address: '',
    receiver_post_code: '',
    insurance: '',
    pack_wood: '',
    courier: {},
    listIds: [],
  };
  constructor(public service: OperationService) {
    super(service);
  }

  public listCourier: any = [];
  public filter: any = {
    manifest_code: '',
    delivery_note_code: '',
    package_code: '',
    tracking_code: '',
    sku: '',
    order_code: '',
    customer_id: '',
    type_tracking: '',
    status: '',
    limit: 20,
    page: 1,
  };
  checkAll = false;
  totalWeight = 0;
  ngOnInit() {
    this.filter.delivery_note_code = this.getParameter('deliveryNoteCode');
    this.search();
    this.loadWarehouse();
  }
  search() {
    this.service.get('dn', this.filter).subscribe(res => {
      if (res.success) {
        this.data = res.data.data;
        this.totalCount = res.data.total;
      }
    });
  }

  refresh() {
    this.filter = {
      package_code: '',
      tracking_code: '',
      sku: '',
      order_code: '',
      type_tracking: '',
      status: '',
      limit: 20,
      page: 1,
    };
    this.search();
  }

  gettotalPage() {
    return Math.ceil(this.totalCount / this.filter.limit);
  }
  handlePagination(event) {
    this.filter.page = event.page;
    this.search();
  }

  getIdCheckBox(id) {
    return 'id_' + id;
  }

  clickCheck() {
    if (this.checkAll !== this.checkAllOld) {
      for (let ind = 0; ind < this.data.length; ind++) {
        if (this.data[ind]['hold'] !== 1 && !this.data[ind]['shipment_id'] && !this.data[ind]['delivery_note_id']) {
          this.checkBoxs[this.getIdCheckBox(this.data[ind]['id'])] = this.checkAll;
        }
      }
      this.checkAllOld = this.checkAll;
    } else {
      let check = true;
      for (let ind = 0; ind < this.data.length; ind++) {
        if (!this.checkBoxs[this.getIdCheckBox(this.data[ind]['id'])]) {
          check = false;
        }
      }
      this.checkAllOld = this.checkAll = check;
    }
  }

  outOfDeliveryNote(id) {
    this.service.popup.confirm(() => {
      this.service.delete('dn/' + id).subscribe(rs => {
        const res: any = rs;
        if (res.success) {
          this.service.popup.success(res.message);
          this.search();
        } else {
          this.service.popup.error(res.message);
        }
      });
    }, 'Do you want out of delivery not now?', 'Out Of');
  }

  checkItemCheckBox() {
    let check = 0;
    this.listChoose = [];
    if (this.data) {
      for (let ind = 0; ind < this.data.length; ind++) {
        if (this.checkBoxs[this.getIdCheckBox(this.data[ind]['id'])]) {
          this.listChoose.push(this.data[ind]);
          check++;
        }
      }
    }
    return check;
  }

  showDeliveryNoteModal() {
    if (this.getListIds()) {
      this.formCreate.warehouse_pickup = this.listChoose[0].warehouse_id;
      this.formCreate.receiver_name = this.listChoose[0].receiver_name;
      this.formCreate.receiver_email = this.listChoose[0].receiver_email;
      this.formCreate.receiver_phone = this.listChoose[0].receiver_phone;
      this.formCreate.receiver_district_name = this.listChoose[0].receiver_district_name;
      this.formCreate.receiver_district_id = this.listChoose[0].receiver_district_id;
      this.formCreate.receiver_province_id = this.listChoose[0].receiver_province_id;
      this.formCreate.receiver_province_name = this.listChoose[0].receiver_province_name;
      this.formCreate.receiver_country_name = this.listChoose[0].receiver_country_name;
      this.formCreate.receiver_country_id = this.listChoose[0].receiver_country_id;
      this.formCreate.receiver_address = this.listChoose[0].receiver_address;
      this.formCreate.receiver_post_code = this.listChoose[0].receiver_post_code;
      this.country = this.formCreate.receiver_country_id;
      this.totalWeight = 0;
      this.listPackages = [];
      this.formCreate.cod = 0;
      this.formCreate.price = 0;
      for (let ind = 0; ind < this.listChoose.length; ind++) {
        this.formCreate.pack_wood = this.listChoose[ind].pack_wood || this.formCreate.pack_wood ? 1 : 0;
        for (let jnd = 0; jnd < this.listChoose[ind].packages.length; jnd++) {
          this.listPackages.push(this.listChoose[ind].packages[jnd]);
          this.totalWeight += parseFloat(this.listChoose[ind].packages[jnd].weight + '');
          this.formCreate.cod += parseFloat(this.listChoose[ind].packages[jnd].cod + '');
          this.formCreate.price += parseFloat(this.listChoose[ind].packages[jnd].price + '');
        }
      }
      this.formCreate.weight = this.totalWeight;
      this.getCountries();
      this.getChangeCountries();
      this.getChangeProvinces();
      this.getChangeDistricts();
      this.suggestCourier();
      this.insertTrackingModal.show();
    }
  }

  getChangeCountries() {
    if (this.formCreate.receiver_country_id) {
      this.provinces = [];  // clear old provinces
      this.districts = []; // clear old districts
      this.country = this.formCreate.receiver_country_id;
      const country_temp = this.getCountry();
      if (country_temp) {
        this.formCreate.receiver_country_name = country_temp.name;
      }
      this.getProvinces();
    }
  }

  getChangeProvinces() {
    if (this.formCreate.receiver_province_id) {
      this.districts = []; // clear old districts
      this.province = this.formCreate.receiver_province_id;
      const province_temp = this.getProvince();
      if (province_temp) {
        this.formCreate.receiver_province_name = province_temp.name;
      }
      this.getDistricts();
    }
  }

  getChangeDistricts() {
    if (this.formCreate.receiver_district_id) {
      this.districts = []; // clear old districts
      this.district = this.formCreate.receiver_district_id;
      const district_temp = this.getDistrict();
      if (district_temp) {
        this.formCreate.receiver_district_name = district_temp.name;
      }
      this.suggestCourier();
    }
  }

  getListIds() {
    this.checkItemCheckBox();
    if (this.listChoose.length > 0) {
      this.formCreate.listIds = [];
      const ids = [];
      let customer_id = 0;
      let checkHasDN = false;
      $.each(this.listChoose, function (k, v) {
        if (!v.customer_id || (customer_id !== 0 && customer_id !== v.customer_id)) {
          customer_id = 0;
          return false;
        }
        customer_id = v.customer_id;
        if (v.shipment_id) {
          checkHasDN = true;
        } else {
          ids.push(v.id);
        }
      });
      if (customer_id === 0 || !customer_id) {
        return this.service.popup.error('You must choose the same customer and cannot have unknown!');
      }
      if (checkHasDN) {
        return this.service.popup.error('Some package has been included in the delivery note!');
      }
      this.formCreate.customer_id = customer_id;
      this.formCreate.listIds = ids;
      return true;
    }
  }

  suggestCourier() {
    const params = this.getParamSuggetCourier();
    this.service.post('courier/suggest', params).subscribe(res => {
      const rs: any = res;
      if (rs.data && rs.data.couriers) {
        this.listCourier = rs.data.couriers;
        this.formCreate.courier = this.listCourier[0];
      } else {
        this.listCourier = [];
        this.formCreate.courier = {};
      }
    });
  }

  getParamSuggetCourier() {
    const param: any = {
      warehouseId: this.formCreate.warehouse_pickup,
      toAddress: this.formCreate.receiver_address,
      toDistrict: this.formCreate.receiver_district_id,
      toProvince: this.formCreate.receiver_province_id,
      toCountry: this.formCreate.receiver_country_id,
      toZipCode: this.formCreate.receiver_post_code,
      toName: this.formCreate.receiver_name,
      toPhone: this.formCreate.receiver_phone,
      totalParcel: this.listPackages.length,
      totalWeight: this.formCreate.weight,
      totalQuantity: 1,
      totalCod: this.formCreate.cod,
      totalAmount: this.formCreate.price,
      isInsurance: this.formCreate.price > 5000000,
      sortMode: 'best_time',
    };
    return param;
  }

  getTotalFee() {
    if (this.formCreate.courier.service_id && this.formCreate.cod) {
      return this.formCreate.cod + this.formCreate.courier.shipping_fee;
    } else if (this.formCreate.courier.service_id) {
      return this.formCreate.courier.shipping_fee;
    } else if (this.formCreate.cod) {
      return this.formCreate.cod;
    } else {
      return 0;
    }
  }

  selectCourier(courier) {
    if (courier.service_id !== this.formCreate.courier.service_id) {
      this.formCreate.courier = courier;
      this.getTotalFee();
    }
  }

  createShipment() {
    this.service.post('s', this.formCreate).subscribe(rs => {
      const res: any = rs;
      if (res.success) {
        this.insertTrackingModal.hide();
        this.service.popup.success(res.message);
        this.listChoose = [];
        this.checkBoxs = [];
        this.search();
      } else {
        this.service.popup.error(res.message);
      }
    });
  }

  merge() {
    this.getListIds();
    if (this.formCreate.listIds.length > 1) {
      this.service.popup.confirm(() => {
        this.service.post('dns/merge', {ids: this.formCreate.listIds}).subscribe(rs => {
          const res: any = rs;
          if (res.success) {
            this.service.popup.success(res.message);
            this.listChoose = [];
            this.checkBoxs = [];
            this.search();
          } else {
            this.service.popup.error(res.message);
          }
        });
      }, 'Do you want merge?');
    }
  }
}
