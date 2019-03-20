import {Component, OnInit} from '@angular/core';
import {PackageItemDataComponent} from '../package-item-data.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BsDaterangepickerConfig} from 'ngx-bootstrap';
import {PopupService} from '../../../core/service/popup.service';
import {PackageService} from '../../package/package.service';

import {RESPONSE} from '../mock-response';

@Component({
    selector: 'app-package-item-list',
    templateUrl: './package-item-list.component.html',
    styleUrls: ['./package-item-list.component.css']
})
export class PackageItemListComponent extends PackageItemDataComponent implements OnInit {

    public items: any = [];
    // form Group
    public searchForm: FormGroup;

    public dateTime: Date;
    public bsRangeValue: Date[];
    public bsConfig: BsDaterangepickerConfig;

    constructor(public packageService: PackageService, private popup: PopupService, private fb: FormBuilder) {
        super(packageService);
    }

    ngOnInit() {
        this.currentPage = 1;
        this.perPage = 20;
        this.dateTime = new Date();
        const maxDateTime: Date = this.dateTime;
        maxDateTime.setDate(this.dateTime.getDate() + 1);
        this.bsRangeValue = [this.dateTime, maxDateTime];
        this.buildSearchForm();
        this.search();
    }

    prepareSearch() {
        const value = this.searchForm.value;

        const params: any = {
            perPage: value.perPage,
            page: value.page
        };
        const filter = [];
        if (value.keyWord !== '') {
            const keywordDeep = {key: 'keyWord', value: {key: value.keyCategory, value: value.keyWord}};
            filter.push(keywordDeep);
        }
        if (value.currentStatus !== 'ALL') {
            filter.push({key: 'currentStatus', value: value.currentStatus});
        }
        if (value.timeRange.length > 0 && (value.timeRange[0] !== '' || value.timeRange[1] !== '')) {

        }
        if (filter.length > 0) {
            const object = filter.reduce((obj, item) => Object.assign(obj, {[item.key]: item.value}), {});
            params.filter = JSON.stringify(object);
        }
        return params;
    }

    search() {
        const params = this.prepareSearch();
        console.log(params);
        const res: any = RESPONSE;
        const data: any = res.data;
        this.items = data._items;
        this.totalCount = data._meta.totalCount;
        this.pageCount = data._meta.pageCount;
        this.currentPage = data._meta.currentPage;
        this.perPage = data._meta.perPage;

        // this.packageService.getAllList(params).subscribe(response => {
        //     if (response.success) {
        //         const data: any = response.data;
        //         this.packages = data._items;
        //         this.totalCount = data._meta.totalCount;
        //         this.pageCount = data._meta.pageCount;
        //         this.currentPage = data._meta.currentPage;
        //         this.perPage = data._meta.perPage;
        //     } else {
        //         this.popup.error(response.message);
        //     }
        // });
    }

    buildSearchForm() {
        this.searchForm = this.fb.group({
            keyCategory: 'ALL',
            keyWord: '',
            timeKey: 'create_at',
            timeRange: this.bsRangeValue,
            currentStatus: 'ALL',
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
        const value = event.target.value;
        this.searchForm.patchValue({perPage: value});
        this.search();
    }

}
