import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OrderDataComponent} from '../order-data.component';
import {OrderService} from '../order.service';
import {BsDaterangepickerConfig} from 'ngx-bootstrap';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css']
})
export class OrderListComponent extends OrderDataComponent implements OnInit {

    // form Group
    public searchForm: FormGroup;

    public dateTime: Date;
    public bsRangeValue: Date[];
    public bsConfig: BsDaterangepickerConfig;

    constructor(public orderService: OrderService, private fb: FormBuilder) {
        super(orderService);
    }

    ngOnInit() {
    }

    buildSearchForm() {
        this.searchForm = this.fb.group({
            store: '',
            paymentStatus: '',
            keyWord: '',
            keyCategory: this.allKey,
            timeKey: this.allKey,
            timeRange: this.bsRangeValue,
            type: this.allKey,
            portal: this.allKey,
            status: this.allKey,
            location: this.allKey,
            sale: this.allKey
        });
    }
}
