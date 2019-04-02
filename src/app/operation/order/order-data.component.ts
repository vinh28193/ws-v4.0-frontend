import {OnInit} from '@angular/core';
import {OperationDataComponent} from '../operation-data.component';
import {OrderService} from './order.service';
import {toNumber} from 'ngx-bootstrap/timepicker/timepicker.utils';

export class OrderDataComponent extends OperationDataComponent implements OnInit {

    public country: any;
    public province: any;
    public district: any;
    public countries: any = [];
    public provinces: any = [];
    public districts: any = [];
    // public getPolicy: any = [];

    public sales: any = [];


    constructor(public http: OrderService) {
        super(http);
        this.loadSystemLocation();
        this.loadAllSales();
    }

    ngOnInit() {

    }

    // ngAfterViewChecked() {
    //     this.loadSystemLocation();
    // }

    isValidValue(value) {
        return this.http.isValidValue(value);
    }

    loadSystemLocation(refresh = false) {
        this.countries = this.http.decrypt('systemCountries');
        this.countries = JSON.parse(this.countries);
        const wait = this.http.decrypt('loading-countries');
        if ((!this.http.isValidValue(this.countries) && wait !== 'wait') || refresh) {
            this.http.encrypt('loading-countries', 'wait');
                  this.http.get('system-location', undefined).subscribe(res => {
                this.countries = res;
                this.countries = this.countries.map(c => {
                    return {
                        id: c.id, name: c.name, provinces: c.systemStateProvinces.map(p => {
                            return {
                                id: p.id, name: p.name, districts: p.systemDistricts.map(d => {
                                    return {id: d.id, name: d.name, zipcodes: []};
                                })
                            };
                        })
                    };
                });
                this.http.encrypt('systemCountries', JSON.stringify(this.countries));
                this.http.encrypt('loading-countries', 'done');
            });
        }
        return this.countries;
    }

    getCountry() {
        const countries = this.getCountries();
        if (countries.length > 0 && this.isValidValue(this.country)) {
            const country = countries.filter(c => Number(c.id) === Number(this.country));
            return country.length > 0 ? country[0] : null;
        }
        return null;
    }

    getProvince() {
        const provinces = this.getProvinces();
        if (provinces.length > 0 && this.isValidValue(this.province)) {
            const province = provinces.filter(p => Number(p.id) === Number(this.province));
            return province.length > 0 ? province[0] : null;
        }
        return null;
    }

    getDistrict() {
        let districts = this.getDistricts();
        if (districts.length > 0 && this.isValidValue(this.province)) {
            districts = districts.filter(d => Number(d.id) === Number(this.district));
        }
        return districts.length > 0 ? districts[0] : null;
    }

    getCountries() {
        if (this.isValidValue(this.countries)) {
            this.countries = this.loadSystemLocation();
        }
        return this.countries;
    }

    getProvinces() {
        let loaded = false;
        if (this.provinces.length === 0 && loaded === false) {
            const country = this.getCountry();
            if (country !== null && typeof country === 'object') {
                this.provinces = country.provinces;
                loaded = true;
            } else {
                this.provinces = [];
            }
        }
        return this.provinces;
    }

    getDistricts() {
        let loaded = false;
        if (this.districts.length === 0 && loaded === false) {
            const province = this.getProvince();
            if (province !== null && typeof province === 'object') {
                this.districts = province.districts;
                loaded = true;
            } else {
                this.districts = [];
            }
        }
        return this.districts;
    }

    loadAllSales(refresh = false): any | [] {
        this.sales = this.http.decrypt('systemSale');
        this.sales = JSON.parse(this.sales);
        const wait = this.http.decrypt('loading-sale');
        if ((!this.http.isValidValue(this.sales) && wait !== 'wait') || refresh) {
            this.http.encrypt('loading-sale', 'wait');
            this.http.get('sale-support', undefined).subscribe(res => {
                this.sales = res;
                this.http.encrypt('systemSale', JSON.stringify(this.sales));
                this.http.encrypt('loading-sale', 'done');
            });
        }
        return this.sales;
    }
    loadPolicy(id: number) {
      if (id) {
        this.http.get(`policy/${id}`).subscribe(res => {
          this.getPolicy = res.data;
        });
        return this.getPolicy;
      }
    }
}
