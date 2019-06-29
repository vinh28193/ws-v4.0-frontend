import {AfterContentChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderDataComponent} from '../../order/order-data.component';
import {PotentialService} from '../potential.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ScopeService} from '../../../core/service/scope.service';
import {PopupService} from '../../../core/service/popup.service';

@Component({
  selector: 'app-customer-info-cart',
  templateUrl: './customer-info-cart.component.html',
  styleUrls: ['./customer-info-cart.component.css']
})
export class CustomerInfoCartComponent extends OrderDataComponent implements OnInit, AfterContentChecked {
  @Input() orderId: any = '';
  @Input() name: any = '';
  @Input() phone: any = '';
  @Input() email: any = '';
  @Input() address: any = '';
  @Input() district: any = '';
  @Input() districtName: any = '';
  @Input() province: any = '';
  @Input() provinceName: any = '';
  @Input() country: any = '';
  @Input() countryName: any = '';
  @Input() postCode: any = '';
  @Input() type: any = '';
  @Input() typeUpdate: any = '';
  @Output() success: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private orderService: PotentialService, private popup: PopupService, private fb: FormBuilder, public _scopes: ScopeService) {
    super(orderService);
  }

  ngOnInit() {
    this.getCountries();
    if (!this.isValidValue(this.country)) {
      this.provinces = [];  // clear old provinces
      this.districts = []; // clear old districts
      const firstC = this.countries ? this.countries[0] : false;
      if (firstC) {
        this.country = firstC.id;
        this.countryName = firstC.name;
      }
    }
    this.getProvinces();
    this.getDistrict();
    // this.province = '';
    // this.provinceName = null;
    // if (this.provinces === null ) {
    //     const firstP = this.provinces[0];
    //     this.province = firstP.id;
    //     this.provinceName = firstP.name;
    //     this.getDistricts();
    //     this.district = '';
    //     this.districtName = null;
    //     if (this.districts.length > 0) {
    //         const firstD = this.districts[this.province];
    //         this.district = firstD.id;
    //         this.districtName = firstD.name;
    //     }
    // }
  }

  ngAfterContentChecked() {

  }


  getInputUnique(attribute: string, unique?: string): string {
    return attribute + (typeof unique !== 'undefined' ? unique : this.orderId);
  }


  updateReceiver() {
      const params: any = {};
      params.receiver_name = this.name;
      params.receiver_phone = this.phone;
      params.receiver_email = this.email;
      params.receiver_address = this.address;
      params.receiver_post_code = this.postCode;
      params.receiver_country_id = this.country;
      params.receiver_country_name = this.countryName;
      params.receiver_province_id = this.province;
      params.receiver_province_name = this.provinceName;
      params.receiver_district_id = this.district;
      params.receiver_district_name = this.districtName;
      params.type = this.type;
      params.typeUpdate = this.typeUpdate;
      this.orderService.put(`cart/${this.orderId}`, params).subscribe(res => {
      const rs: any = res;
      this.success.emit(res.success);
      if (rs.success) {
        this.popup.success(res.message);
      } else {
        this.popup.error(res.message);
      }
    });
  }

  close() {
    this.success.emit(true);
  }

  suggestionAddress(zip) {
    // give full address by zip code
    // see onCountry($event)
  }

  onCountry(country) {
    const target = country.target;
    this.country = target.value;
    const selectedOptions = target.options;
    const selectedIndex = selectedOptions.selectedIndex;
    this.countryName = selectedOptions[selectedIndex].text;
    this.provinces = [];  // clear old provinces
    this.districts = []; // clear old districts
    this.getProvinces();
    this.province = '';
    this.provinceName = null;
    if (this.provinces.length > 0) {
      const firstP = this.provinces[0];
      this.province = firstP.id;
      this.provinceName = firstP.name;
      this.getDistricts();
      this.district = '';
      this.districtName = null;
      if (this.districts.length > 0) {
        const firstD = this.districts[0];
        this.district = firstD.id;
        this.districtName = firstD.name;
      }
    }
  }

  onProvince(province) {
    const target = province.target;
    this.province = target.value;
    const selectedOptions = target.options;
    const selectedIndex = selectedOptions.selectedIndex;
    this.provinceName = selectedOptions[selectedIndex].text;
    this.district = '';
    this.districtName = null;
    this.districts = []; // clear up
    this.getDistricts();
    if (this.districts.length > 0) {
      const first = this.districts[0];
      this.district = first.id;
      this.districtName = first.name;
    }
  }

  onDistrict(district) {
    const target = district.target;
    this.district = target.value;
    const selectedOptions = target.options;
    const selectedIndex = selectedOptions.selectedIndex;
    this.districtName = selectedOptions[selectedIndex].text;
  }
}
