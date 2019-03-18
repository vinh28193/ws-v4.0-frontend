import {Component, OnInit} from '@angular/core';
import {ModuleComponent} from '../module.component';

@Component({
    selector: 'app-operation',
    templateUrl: './operation-routing.component.html',
    styleUrls: ['./operation-routing.component.css']
})
export class OperationRoutingComponent extends ModuleComponent implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
    }

}
