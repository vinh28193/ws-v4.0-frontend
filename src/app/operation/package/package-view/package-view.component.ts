import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {ScopeService} from '../../../core/service/scope.service';
import {PackageDataComponent} from '../package-data.component';
import {PackageService} from '../package.service';

@Component({
  selector: 'app-package-view',
  templateUrl: './package-view.component.html',
  styleUrls: ['./package-view.component.css']
})
export class PackageViewComponent extends PackageDataComponent implements OnInit {

  @Input() tab_tracking = '';
  @Input() manifest_id = '';
  @Input() tracking_codes: any = {};
  @Output() sellerRefund: EventEmitter<any> = new EventEmitter<any>();
  @Output() updatePackage: EventEmitter<any> = new EventEmitter<any>();
  @Output() searchEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() mergeTracking: EventEmitter<any> = new EventEmitter<any>();
  @Output() markHold: EventEmitter<any> = new EventEmitter<any>();
  @Output() splitTracking: EventEmitter<any> = new EventEmitter<any>();
  @Output() viewLogs: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('viewInsertShipment') viewInsertShipment: ModalDirective;
  @ViewChild('insertTrackingModal') insertTrackingModal: ModalDirective;
  public totalCount = 0;
  public checkAll = false;
  public checkAllOld = false;
  public checkBoxs: any = [];
  public listSelect: any = [];
  public tracking_codes_rs: any = {};
  public formSearchPackage: any = {
    limit: 20,
    page: 1,
    manifest_id: '',
    package_code: '',
    tracking_code: '',
    order_code: '',
    product_id: '',
    customer_id: '',
    phone: '',
    name: '',
    email: '',
    status: '',
    tab_tracking: 'complete',
  };
  showInfoReceiver = false;
  public formCreate: any = [];
  // public formCreate: any = {
  //   length: 0,
  //   width: 0,
  //   height: 0,
  //   weight: 0,
  //   receiver_name: '',
  //   receiver_email: '',
  //   receiver_phone: '',
  //   receiver_district_name: '',
  //   receiver_district_id: '',
  //   receiver_province_id: '',
  //   receiver_province_name: '',
  //   receiver_country_name: '',
  //   receiver_country_id: '',
  //   receiver_address: '',
  //   receiver_post_code: '',
  // };
  public listChoose: any = [];
  public listIds: any = [];
  public totalWeight = 0;
  public chooseTabCreate = true;
  constructor(
      public packageService: PackageService,
      public _scope: ScopeService
  ) {
    super(packageService, _scope);
  }

  ngOnInit() {
  }

  getIdCheckBox(id) {
    return 'id_' + id;
  }

  sellerRefundEvent(packTr) {
    this.sellerRefund.emit(packTr);
  }

  markHoldTracking(id, hold) {
    this.markHold.emit({id: id, hold: hold});
  }

  showUpdateForm(item) {
    this.updatePackage.emit(item);
  }

  splitTrackingEvent(item) {
    this.splitTracking.emit(item);
  }

  viewLog(event) {
    this.viewLogs.emit(event);
  }

  getTotalPage() {

  }

  getTotalItem() {
    if (this.totalCount > this.tracking_codes.length) {
      return this.totalCount;
    }
    return this.tracking_codes.length;
  }

  refreshSearch() {
    this.formSearchPackage = {
      limit: 20,
      page: 1,
      manifest_id: '',
      package_code: '',
      tracking_code: '',
      order_code: '',
      product_id: '',
      customer_id: '',
      phone: '',
      name: '',
      email: '',
      status: '',
      tab_tracking: 'complete',
    };
    this.search();
  }

  handlePagination(event) {
    this.formSearchPackage.page = event.page;
    this.search();
  }

  search() {
    if (this.tab_tracking === 'package') {
      this.searchPackage();
    } else {
    }
  }
  searchPackage() {
    this.formSearchPackage.manifest_id = this.manifest_id;
    console.log(this.manifest_id);
    this.packageService.get('package', this.formSearchPackage).subscribe(rs => {
      if (rs.success) {
        this.tracking_codes = rs.data.data;
        this.totalCount = rs.data.total;
      } else {
        this.packageService.popup.error(rs.message);
      }
    });
  }

  searchFastPackage() {
    let rs = this.tracking_codes_rs;
    let match = '';
    if (this.formSearchPackage.customer_id) {
      match = this.formSearchPackage.customer_id;
      rs = rs.filter(c => c.order.customer_id === match);
    }
    if (this.formSearchPackage.tracking_code) {
      match = this.formSearchPackage.tracking_code;
      rs = rs.filter(c => c.tracking_code.toUpperCase() === match.toUpperCase());
    }
    if (this.formSearchPackage.status === 'create') {
      rs = rs.filter(c => c.delivery_note_code === null || c.delivery_note_code === '');
    }
    if (this.formSearchPackage.status === 'create') {
      rs = rs.filter(c => c.delivery_note_code !== null || c.delivery_note_code !== '');
    }
    if (this.formSearchPackage.product_id) {
      match = this.formSearchPackage.product_id;
      rs = rs.filter(c => c.product_id === match);
    }
    if (this.formSearchPackage.phone) {
      match = this.formSearchPackage.phone;
      rs = rs.filter(c => c.order.phone.toUpperCase() === match.toUpperCase());
    }
    if (this.formSearchPackage.order_code) {
      match = this.formSearchPackage.order_code;
      rs = rs.filter(c => c.order.order_code.toUpperCase() === match.toUpperCase());
    }
    if (this.formSearchPackage.email) {
      match = this.formSearchPackage.email;
      rs = rs.filter(c => c.order.email.toUpperCase() === match.toUpperCase());
    }
    this.tracking_codes = rs;
    this.getTrackingCodes();
  }

  getTrackingCodes() {
    if (this.tracking_codes_rs.length <= this.tracking_codes.length) {
      this.tracking_codes_rs = this.tracking_codes;
    }
    return this.tracking_codes;
  }

  clickCheck() {
    if (this.checkAll !== this.checkAllOld) {
      for (let ind = 0; ind < this.tracking_codes.length; ind++) {
        if (this.tracking_codes[ind]['hold'] !== 1 &&
            !this.tracking_codes[ind]['shipment_id'] &&
            !this.tracking_codes[ind]['delivery_note_id']) {
          this.checkBoxs[this.getIdCheckBox(this.tracking_codes[ind]['id'])] = this.checkAll;
        }
      }
      this.checkAllOld = this.checkAll;
    } else {
      let check = true;
      for (let ind = 0; ind < this.tracking_codes.length; ind++) {
        if (!this.checkBoxs[this.getIdCheckBox(this.tracking_codes[ind]['id'])]) {
          check = false;
        }
      }
      this.checkAllOld = this.checkAll = check;
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
    }
  }

  checkItemCheckBox() {
    let check = 0;
    this.totalWeight = 0;
    this.listChoose = [];
    for (let ind = 0; ind < this.tracking_codes.length; ind++) {
      if (this.checkBoxs[this.getIdCheckBox(this.tracking_codes[ind]['id'])]) {
        this.listChoose.push(this.tracking_codes[ind]);
        this.totalWeight += parseFloat(this.tracking_codes[ind].weight + '');
        check++;
      }
    }
    return check;
  }

  getListIds(validate = true) {
    this.checkItemCheckBox();
    if (this.listChoose.length > 0) {
      this.listIds = [];
      const ids = [];
      let customer_id = 0;
      let checkHasDN = false;
      $.each(this.listChoose, function (k, v) {
        if (validate) {
          if (!v.order || (customer_id !== 0 && customer_id !== v.order.customer_id)) {
            customer_id = 0;
            return false;
          }
        }
        customer_id = v.order ? v.order.customer_id : 0;
        if (v.delivery_code) {
          checkHasDN = true;
        } else {
          ids.push(v.id);
        }
      });
      if (validate) {
        if (customer_id === 0 || !customer_id) {
          return this.packageService.popup.error('You must choose the same customer and cannot have unknown!');
        }
        if (checkHasDN) {
          return this.packageService.popup.error('Some package has been included in the delivery note!');
        }
      }
      this.listIds = ids;
      return true;
    }
  }

  showDeliveryNoteModal() {
    if (this.getListIds()) {
      this.formCreate.receiver_name = this.listChoose[0].order.receiver_name;
      this.formCreate.receiver_email = this.listChoose[0].order.receiver_email;
      this.formCreate.receiver_phone = this.listChoose[0].order.receiver_phone;
      this.formCreate.receiver_district_name = this.listChoose[0].order.receiver_district_name;
      this.formCreate.receiver_district_id = this.listChoose[0].order.receiver_district_id;
      this.formCreate.receiver_province_id = this.listChoose[0].order.receiver_province_id;
      this.formCreate.receiver_province_name = this.listChoose[0].order.receiver_province_name;
      this.formCreate.receiver_country_name = this.listChoose[0].order.receiver_country_name;
      this.formCreate.receiver_country_id = this.listChoose[0].order.receiver_country_id;
      this.formCreate.receiver_address = this.listChoose[0].order.receiver_address;
      this.formCreate.receiver_post_code = this.listChoose[0].order.receiver_post_code;
      console.log(this.listChoose);
      console.log(this.formCreate);
      this.country = this.formCreate.receiver_country_id;
      this.getCountries();
      this.getChangeCountries();
      this.getChangeProvinces();
      this.getChangeDistricts();
      this.insertTrackingModal.show();
    }
  }

  create1vs1(all = false) {
    if (!all) {
      if (this.getListIds(false)) {
        if (this.listIds.length === 0) {
          return this.packageService.popup.error('Dont have item chosen!');
        }
        this.packageService.popup.confirm(() => {
          this.packageService.post('dn', {listPackage: this.listIds, create1vs1: true}).subscribe(rs => {
            const res: any = rs;
            if (res.success) {
              this.packageService.popup.success(res.message);
              this.insertTrackingModal.hide();
              this.listChoose = [];
              this.checkBoxs = [];
              this.search();
            } else {
              this.packageService.popup.error(res.message);
            }
          });
        }, 'Do you want create ' + this.listIds.length + ' delivery not now?', 'Create');
      }
    } else {
      this.packageService.popup.confirm(() => {
        this.packageService.post('dn', {manifest_id: this.manifest_id, create1vs1: true}).subscribe(rs => {
          const res: any = rs;
          if (res.success) {
            this.packageService.popup.success(res.message);
            this.insertTrackingModal.hide();
            this.listChoose = [];
            this.checkBoxs = [];
            this.search();
          } else {
            this.packageService.popup.error(res.message);
          }
        });
      }, 'Do you want create all delivery not now?', 'Create');
    }
  }
  removeList(id) {
    this.checkBoxs[this.getIdCheckBox(id)] = false;
    this.clickCheck();
  }
  createDeliveryNote() {
    this.formCreate.weight = this.formCreate.weight ? this.formCreate.weight : this.totalWeight;
    if (this.getListIds()) {
      if (this.listIds.length === 0) {
        return this.packageService.popup.error('Dont have item chosen!');
      }
      this.packageService.post('dn', {listPackage: this.listIds, infoDeliveryNote: this.formCreate}).subscribe(rs => {
        const res: any = rs;
        if (res.success) {
          this.packageService.popup.success(res.message);
          this.insertTrackingModal.hide();
          this.listChoose = [];
          this.checkBoxs = [];
          this.search();
        } else {
          this.packageService.popup.error(res.message);
        }
      });
    }
  }
  SurgesMerge(all = false) {
    if (!all) {
      if (this.getListIds(false)) {
        if (this.listIds.length === 0) {
          return this.packageService.popup.error('Dont have item chosen!');
        }
        this.packageService.post('s-package/merge', {listPackage: this.listIds}).subscribe(rs => {
          const res: any = rs;
          if (res.success) {
            console.log(res);
          } else {
            this.packageService.popup.error(res.message);
          }
        });
      }
    } else {
      this.packageService.post('s-package/merge', {manifest_id: this.manifest_id}).subscribe(rs => {
        const res: any = rs;
        if (res.success) {
          console.log(res);
        } else {
          this.packageService.popup.error(res.message);
        }
      });
    }
  }
}
