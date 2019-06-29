import {OnInit} from '@angular/core';
import {OperationDataComponent} from '../operation-data.component';
import {OrderService} from './order.service';
import {toNumber} from 'ngx-bootstrap/timepicker/timepicker.utils';

export class OrderDataComponent extends OperationDataComponent implements OnInit {


    public getPolicy: any = [];
    public getAllPolicy: any = [];
    public sales: any = [];

    constructor(public http: OrderService) {
        super(http);
        this.loadAllSales();
    }

    ngOnInit() {
      this.loadAllSales();
    }

    // ngAfterViewChecked() {
    //     this.loadSystemLocation();
    // }

    loadAllSales(refresh = false): any {
        this.sales = this.http.decrypt('systemSale');
        this.sales = JSON.parse(this.sales);
        const wait = this.http.decrypt('loading-sale');
        if ((!this.http.isValidValue(this.sales) && wait !== 'wait') || refresh) {
            this.http.encrypt('loading-sale', 'wait');
            this.http.get('sale-support', undefined).subscribe(res => {
                this.sales = res;
                console.log(this.sales);
                this.http.encrypt('systemSale', JSON.stringify(this.sales));
                this.http.encrypt('loading-sale', 'done');
            });
        }
        return this.sales;
    }
    loadPolicy(id: number | undefined) {
      if (id) {
        this.http.getNoLoad(`policy/${id}`).subscribe(res => {
          this.getPolicy = res.data;
          console.log(this.getPolicy);
        });
        return this.getPolicy;
      }
    }

    loadAllPolicy() {
      this.http.get(`policy`).subscribe(res => {
        this.getAllPolicy = res.data;
      });
      return this.getAllPolicy;
    }

}
