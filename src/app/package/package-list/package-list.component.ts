import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BaseComponent} from '../../core/base.compoment';

import {FormBuilder, FormGroup} from '@angular/forms';
import {PackageService} from '../package.service';

@Component({
    selector: 'app-package-list',
    templateUrl: './package-list.component.html',
    styleUrls: ['./package-list.component.css']
})
export class PackageListComponent extends BaseComponent implements OnInit {

    @ViewChild('packageItemTemplate') packageItemTemplate: TemplateRef<any>;

    public packages: any = [];

    // form Group
    public searchForm: FormGroup;
    // Template
    public itemTemplate: TemplateRef<any>;

    constructor(public packageService: PackageService, private fb: FormBuilder) {
        super(packageService);
    }

    ngOnInit() {
    }

    buildForm() {
        this.searchForm = this.fb.group({});
    }

    getAllList() {
        this;
    }
}
