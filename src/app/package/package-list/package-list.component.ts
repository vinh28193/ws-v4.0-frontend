import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BaseComponent} from '../../core/base.compoment';

import {FormBuilder, FormGroup} from '@angular/forms';
import {PackageService} from '../package.service';
import {PopupService} from '../../core/service/popup.service';

@Component({
    selector: 'app-package-list',
    templateUrl: './package-list.component.html',
    styleUrls: ['./package-list.component.css']
})
export class PackageListComponent extends BaseComponent implements OnInit {

    @ViewChild('packageListTemplate') packageListTemplate: TemplateRef<any>;
    @ViewChild('orderListTemplate') orderListTemplate: TemplateRef<any>;
    @ViewChild('productListTemplate') productListTemplate: TemplateRef<any>;

    public packages: any = [];

    // meta
    public totalCount: number;
    public pageCount: number;
    public currentPage: number;
    public perPage: number;
    // form Group
    public searchForm: FormGroup;
    // Template
    public togglePackageTemplate: TemplateRef<any>;

    constructor(public packageService: PackageService, private popup: PopupService, private fb: FormBuilder) {
        super(packageService);
    }

    ngOnInit() {
        this.currentPage = 1;
        this.perPage = 20;
        this.getAllList();
        this.buildForm();
        this.togglePackageTemplate = this.packageListTemplate;
    }

    prepareSearch() {
        return this.searchForm.value;
    }

    search() {
        const params = this.prepareSearch();
        console.log(params);
    }

    buildForm() {
        this.searchForm = this.fb.group({
            filter: this.fb.group({
                keyword: ''
            }),
            page: this.currentPage,
            perPage: this.perPage,
        });
    }

    handlePagination(event) {
        const page = event.page;
        this.searchForm.patchValue({page: page});
        this.search();
    }

    handlePerPage(event) {
        const value = Number(event.target.value);
        this.searchForm.patchValue({perPage: value});
        this.search();
    }

    getAllList() {
        this.packageService.getAllList(undefined).subscribe(response => {
            if (response.success) {
                const data: any = response.data;
                this.packages = data._items;
                this.totalCount = data._meta.totalCount;
                this.pageCount = data._meta.pageCount;
                this.currentPage = data._meta.currentPage;
                this.perPage = data._meta.perPage;
            } else {
                this.popup.error(response.message);
            }
        });
    }
}
