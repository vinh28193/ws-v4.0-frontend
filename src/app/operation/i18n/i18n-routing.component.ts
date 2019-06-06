import {Component, OnInit} from '@angular/core';
import {OperationRoutingComponent} from '../operation-routing.component';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-package',
    template: '<router-outlet></router-outlet>'
})
export class I18nRoutingComponent extends OperationRoutingComponent implements OnInit {

    constructor(public activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    ngOnInit() {
    }

}
