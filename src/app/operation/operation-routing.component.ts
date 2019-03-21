import {Component, OnInit} from '@angular/core';
import {ModuleComponent} from '../module.component';
import {ActivatedRoute} from '@angular/router';

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'app-operation',
    templateUrl: './operation-routing.component.html',
    styleUrls: ['./operation-routing.component.css']
})
export class OperationRoutingComponent extends ModuleComponent implements OnInit {

    constructor(public activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    public address: any;

    ngOnInit() {
    }

    closeSidebar() {
        $('.page-wrapper').removeClass('toggled');

    }

    showSidebar() {
        $('.page-wrapper').addClass('toggled');
    }
}
