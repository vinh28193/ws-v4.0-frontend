import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BaseComponent} from '../../core/base.compoment';

import {FormBuilder, FormGroup} from '@angular/forms';
import {PackageService} from '../package.service';

import {PACKAGES} from '../mock-package';

@Component({
    selector: 'app-package-list',
    templateUrl: './package-list.component.html',
    styleUrls: ['./package-list.component.css']
})
export class PackageListComponent extends BaseComponent implements OnInit {

    @ViewChild('packageListTemplate') packageListTemplate: TemplateRef<any>;

    @ViewChild('orderListTemplate') orderListTemplate: TemplateRef<any>;
    @ViewChild('orderDetailTemplate') orderDetailTemplate: TemplateRef<any>;
    @ViewChild('productListTemplate') productListTemplate: TemplateRef<any>;
    @ViewChild('productDetailTemplate') productDetailTemplate: TemplateRef<any>;
    public packages: any = [];

    // form Group
    public searchForm: FormGroup;
    // Template
    public togglePackageTemplate: TemplateRef<any>;
    public toggleOrderTemplate: TemplateRef<any>;
    public toggleProductTemplate: TemplateRef<any>;

    constructor(public packageService: PackageService, private fb: FormBuilder) {
        super(packageService);
    }

    public tester = 'i am tester';

    ngOnInit() {
        this.packages = PACKAGES;
        this.togglePackageTemplate = this.packageListTemplate;
        this.toggleOrderTemplate = this.orderListTemplate;
        this.toggleProductTemplate = this.productListTemplate;
    }

    buildForm() {
        this.searchForm = this.fb.group({});
    }

    getAllList() {

    }
}
