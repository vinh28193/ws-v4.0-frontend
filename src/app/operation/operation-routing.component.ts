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
  loging: any;
  role: any;
  user: any;

    constructor(public activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    public statusSidebar = localStorage.getItem('status-sidebar') ? localStorage.getItem('status-sidebar') : 'show';
    public address: any;

    ngOnInit() {
      this.loging = localStorage.getItem('userLogin');
      this.role = localStorage.getItem('scope');
      this.user = (JSON.parse(this.loging).username);
    }

    closeSidebar() {
        $('.page-wrapper').removeClass('toggled');
        this.statusSidebar = 'hide';
        localStorage.setItem('status-sidebar', this.statusSidebar);
    }

    showSidebar() {
        $('.page-wrapper').addClass('toggled');
        this.statusSidebar = 'show';
        localStorage.setItem('status-sidebar', this.statusSidebar);
    }
}
