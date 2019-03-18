import {Component, OnInit} from '@angular/core';
import {OperationRoutingComponent} from '../operation-routing.component';

@Component({
    selector: 'app-shipment',
    template: '<router-outlet></router-outlet>'
})
export class ShipmentRoutingComponent extends OperationRoutingComponent implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
    }

}
