import {OnInit} from '@angular/core';
import {OperationDataComponent} from '../operation-data.component';
import {OrderService} from './order.service';

export class OrderDataComponent extends OperationDataComponent implements OnInit {

    constructor(public http: OrderService) {
        super(http);
    }

    ngOnInit() {
    }

}
