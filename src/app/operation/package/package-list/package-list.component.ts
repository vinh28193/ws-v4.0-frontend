import {Component, OnInit} from '@angular/core';

import {FormBuilder} from '@angular/forms';
import {PackageService} from '../package.service';
import {PackageDataComponent} from '../package-data.component';
import {ScopeService} from '../../../core/service/scope.service';

@Component({
    selector: 'app-package-list',
    templateUrl: './package-list.component.html',
    styleUrls: ['./package-list.component.css']
})
export class PackageListComponent extends PackageDataComponent implements OnInit {
    constructor(
        public packageService: PackageService,
        public fb: FormBuilder,
        public _scope: ScopeService
    ) {
        super(packageService, _scope);
    }

    public filter: any = {
        tracking_code: '',
        sku: '',
        order_code: '',
        type_tracking: '',
        limit: 20,
        page: 1,
    };
    public total = 0;
    public data: any = [];
    ngOnInit() {
        super.ngOnInit();
        this.search();
    }

    search() {
        this.packageService.get('p', this.filter).subscribe(res => {
            if (res.success) {
                this.data = res.data.data;
                this.total = res.data.total;
            }
        });
    }

    refresh() {
        this.filter = {
            tracking_code: '',
            sku: '',
            order_code: '',
            type_tracking: '',
            limit: 20,
            page: 1,
        };
        this.search();
    }

    gettotalPage() {
        return Math.ceil(this.total / this.filter.limit);
    }

    handlePagination(event) {
        this.filter.page = event.page;
        this.search();
    }
}
