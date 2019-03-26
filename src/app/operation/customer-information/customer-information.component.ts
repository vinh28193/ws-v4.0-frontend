import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
    @Input() unique: any = 'customer';
    @Input() identity: any = '';
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

    public formGroup: FormGroup;

    constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
        super(orderService);
    }

    ngOnInit() {
        this.getCountries();
    }

    buildFormData() {
        const form = new FormData();
        const customer = {
            identity: this.identity,
            // name: this.customerName,
            // phone: this.customerPhone,
            // email: this.customerEmail,
            // address: this.customerAddress,
            // districtId: this.district,
            // districtName: this.districtName,
            // provinceId: this.province,
            // provinceName: this.provinceName,
            // countryId: this.customerCountry,
            // countryName: this.countryName,
            // postCode: this.customerPostcode
        };
        // console.log(customer);
        form.append('component', this.unique);
        form.append('customer', JSON.stringify(customer));
        return form;
    }

    getInputUnique(attribute: string, unique?: string) {
        return attribute + (typeof unique !== 'undefined' ? unique : (this.identity + this.unique));
    }

    prepareModalData() {
        if (this.country === null || this.country === '') {
            this.provinces = [];  // clear old provinces
            this.districts = []; // clear old districts
            this.getCountries();
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

    onOpenModal() {
        this.prepareModalData();
        this.update.show();
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
