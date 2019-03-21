import {Component, OnInit} from '@angular/core';
import {OperationRoutingComponent} from '../operation-routing.component';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-package-item-routing',
    template: '<router-outlet></router-outlet>'
})
export class PackageItemRoutingComponent extends OperationRoutingComponent implements OnInit {

    constructor(public activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    ngOnInit() {
    }

}
