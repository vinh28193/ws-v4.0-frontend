import {Component, OnInit} from '@angular/core';
import {ModuleComponent} from '../module.component';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-operation',
    templateUrl: './operation-routing.component.html',
    styleUrls: ['./operation-routing.component.css']
})
export class OperationRoutingComponent extends ModuleComponent implements OnInit {

    constructor(public activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    ngOnInit() {
    }

}
