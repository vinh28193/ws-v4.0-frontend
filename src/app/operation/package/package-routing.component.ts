import {Component, OnInit} from '@angular/core';
import {OperationRoutingComponent} from '../operation-routing.component';

@Component({
    selector: 'app-package',
    template: '<router-outlet></router-outlet>'
})
export class PackageRoutingComponent extends OperationRoutingComponent implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
    }

}
