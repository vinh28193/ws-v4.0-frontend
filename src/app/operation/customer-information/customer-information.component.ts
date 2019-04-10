import {AfterContentChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderDataComponent} from '../order/order-data.component';
import {OrderService} from '../order/order.service';
import {PopupService} from '../../core/service/popup.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.css']
})
export class CustomerInformationComponent extends OrderDataComponent implements OnInit, AfterContentChecked {
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
  @Output() success: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
    super(orderService);
  }

  ngOnInit() {
    this.getCountries();
    if (!this.isValidValue(this.country)) {
      this.provinces = [];  // clear old provinces
      this.districts = []; // clear old districts
      const firstC = this.countries[0];
      this.country = firstC.id;
      this.countryName = firstC.name;
    }
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

  ngAfterContentChecked() {

  }


  getInputUnique(attribute: string, unique?: string): string {
    return attribute + (typeof unique !== 'undefined' ? unique : this.orderId);
  }


  updateReceiver() {
    const post = this.orderService.createPostParams({
      receiver_name: this.name,
      receiver_phone: this.phone,
      receiver_email: this.email,
      receiver_address: this.address,
      receiver_post_code: this.postCode,
      receiver_country_id: this.country,
      receiver_country_name: this.countryName,
      receiver_province_id: this.province,
      receiver_province_name: this.provinceName,
      receiver_district_id: this.district,
      receiver_district_name: this.districtName
    }, 'updateReceiver');
    this.orderService.put(`order/${this.orderId}`, post).subscribe(res => {
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

  checkRole() {
    if (localStorage.getItem('scope') === ('master_marketing' || 'accountant' || 'master_accountant' || 'marketing_intent' || 'marketing_ads' || 'marketing')) {
      return true;
    }
  }
}
