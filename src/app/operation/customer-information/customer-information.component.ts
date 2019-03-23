import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {OrderDataComponent} from '../order/order-data.component';
import {OrderService} from '../order/order.service';
import {PopupService} from '../../core/service/popup.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.css']
})
export class CustomerInformationComponent extends OrderDataComponent implements OnInit {

  @ViewChild('update') update: ModalDirective;

  @Input() disable: any = false;
  @Input() showLabel: any = true;
  @Input() labelText: any = 'Customer';
  @Input() componentUnique: any = 'customer';
  @Input() customerIdentity: any = '';
  @Input() customerName: any = '';
  @Input() customerPhone: any = '';
  @Input() customerEmail: any = '';
  @Input() customerAddress: any = '';
  @Input() customerDistrict: any = '';
  @Input() customerDistrictName: any = '';
  @Input() customerProvince: any = '';
  @Input() customerProvinceName: any = '';
  @Input() customerCountry: any = '';
  @Input() customerCountryName: any = '';
  @Input() customerPostcode: any = '';

  countries = [];
  provinces = [];
  districts = [];
  public formGroup: FormGroup;

  isSuccess = false;
  data: any = [];

  private saveKeyPrefix = 'provinceStore';

  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
    super(orderService);
  }

  ngOnInit() {
    // this.getCountries();
  }
  buildFormData() {
    const form = new FormData();
    const customer = {
      identity: this.customerIdentity,
      name: this.customerName,
      phone: this.customerPhone,
      email: this.customerEmail,
      address: this.customerAddress,
      districtId: this.customerDistrict,
      districtName: this.customerDistrictName,
      provinceId: this.customerProvince,
      provinceName: this.customerProvinceName,
      countryId: this.customerCountry,
      countryName: this.customerCountryName,
      postCode: this.customerPostcode
    };
    console.log(customer);

    form.append('component', this.componentUnique);
    form.append('customer', JSON.stringify(customer));
    return form;
  }

  getInputUnique(attribute: string, unique?: string) {
    return attribute + (typeof unique !== 'undefined' ? unique : (this.customerIdentity + this.componentUnique));
  }

  prepareModalData() {
    if (this.customerCountry === null || this.customerCountry === '') {
      const firstC = this.countries[0];
      this.customerCountry = firstC.id;
      this.customerCountryName = firstC.name;
    }
    // this.getProvinces();
    // this.getDistricts();
  }

  onOpenModal() {
    this.prepareModalData();
    this.update.show();
  }

  getProvince() {
    const provinces = this.getProvinces();
    if (provinces.length > 0) {
      const province = provinces.filter(p => Number(p.id) === Number(this.customerProvince));
      return province.length > 0 ? province[0] : null;
    }
    return null;
  }

  getDistrict() {
    let districts = this.getDistricts();
    if (districts.length > 0) {
      districts = districts.filter(d => Number(d.id) === Number(this.customerDistrict));
    }
    return districts.length > 0 ? districts[0] : null;
  }

  suggestionAddress(zip) {
    // give full address by zip code
    // see onCountry($event)
  }

  onCountry(country) {
    const target = country.target;
    this.customerCountry = target.value;
    const selectedOptions = target.options;
    const selectedIndex = selectedOptions.selectedIndex;
    this.customerCountryName = selectedOptions[selectedIndex].text;
    this.provinces = [];  // clear old provinces
    this.districts = []; // clear old districts
    this.data = []; // clear old data
    this.getProvinces();
    this.customerProvince = '';
    this.customerDistrictName = null;
    if (this.provinces.length > 0) {
      const firstP = this.provinces[0];
      this.customerProvince = firstP.id;
      this.customerProvinceName = firstP.name;
      this.getDistricts();
      this.customerDistrict = '';
      this.customerDistrictName = null;
      if (this.districts.length > 0) {
        const firstD = this.districts[0];
        this.customerDistrict = firstD.id;
        this.customerDistrictName = firstD.name;
      }
    }
  }

  onProvince(province) {
    const target = province.target;
    this.customerProvince = target.value;
    const selectedOptions = target.options;
    const selectedIndex = selectedOptions.selectedIndex;
    this.customerProvinceName = selectedOptions[selectedIndex].text;
    this.customerDistrict = '';
    this.customerDistrictName = null;
    this.districts = []; // clear up
    this.getDistricts();
    if (this.districts.length > 0) {
      const first = this.districts[0];
      this.customerDistrict = first.id;
      this.customerDistrictName = first.name;
    }
  }

  onDistrict(district) {
    const target = district.target;
    this.customerDistrict = target.value;
    const selectedOptions = target.options;
    const selectedIndex = selectedOptions.selectedIndex;
    this.customerDistrictName = selectedOptions[selectedIndex].text;
  }

  // getCountries() {
  //   this.countries = this.storageService.getItem('countries');
  //   const wait = this.storageService.getRaw('loading-countries');
  //   if (!this.countries && wait !== 'wait') {
  //       this.storageService.setRaw('loading-countries', 'wait');
  //       this.customerService.getAll('data/getcountries').subscribe(res => {
  //           this.countries = res;
  //           this.storageService.setItem('countries', JSON.stringify(this.countries));
  //           this.storageService.setRaw('loading-countries', 'done');
  //       });
  //   }
  //   this.countries = [
  //     {id: 1, name: 'Việt Nam'},
  //     {id: 2, name: 'Indonesia'},
  //     {id: 3, name: 'Malaysia'},
  //     {id: 7, name: 'ThaiLand'},
  //   ];
  // }

  // getProvinces() {
  //   if (this.provinces.length === 0) {
  //     this.provinces = this.local.getAllProvinces(this.customerCountry);
  //   }
  //   return this.provinces;
  // }

  getDistricts() {
    let loaded = false;
    if (this.districts.length === 0 && loaded === false) {
      const province = this.getProvince();
      if (province !== null && typeof province === 'object') {
        this.districts = province.districts;
      } else {
        loaded = true;
        this.districts = [];
      }
    }
    console.log(this.districts);
    return this.districts;
  }

  getCacheKey() {
    let country = this.customerCountry;
    if (country === null || country === '') {
      country = 'all';
    }
    return this.saveKeyPrefix + country;
  }
}
