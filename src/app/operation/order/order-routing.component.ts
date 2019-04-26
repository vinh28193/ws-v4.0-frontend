import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OperationRoutingComponent} from '../operation-routing.component';

@Component({
    selector: 'app-order-routing',
    template: '<router-outlet></router-outlet>'
})
export class OrderRoutingComponent extends OperationRoutingComponent implements OnInit {

    constructor(
        public activatedRoute: ActivatedRoute
    ) {
        super(activatedRoute);
    }

    ngOnInit() {
    }

}
