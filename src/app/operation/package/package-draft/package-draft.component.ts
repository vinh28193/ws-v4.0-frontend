import {Component, OnInit} from '@angular/core';
import {PackageDataComponent} from '../package-data.component';
import {PackageDraftService} from './package-draft.service';
import {FormGroup} from '@angular/forms';
import {MockResponse} from './mock-response';

@Component({
    selector: 'app-package-draft',
    templateUrl: './package-draft.component.html',
    styleUrls: ['./package-draft.component.css']
})
export class PackageDraftComponent extends PackageDataComponent implements OnInit {

    public items: any = [];
    public item: any = {};
    public itemForm: FormGroup;
    public mapFrom: FormGroup;
    public searchForm: FormGroup;


    constructor(public draftPackageService: PackageDraftService) {
        super(draftPackageService);
    }

    ngOnInit() {
        this.currentPage = 1;
        this.perPage = 20;
        this.buildSearchForm();
        this.buildItemForm();
        this.buildMapForm();
        this.search();
        console.log(this.items);
    }

    isUndefined($item) {
        return !(
            this.draftPackageService.isValidValue($item.order) &&
            this.draftPackageService.isValidValue($item.product)
        );
    }

    buildSearchForm() {

    }

    buildItemForm() {

    }

    buildMapForm() {

    }

    search() {
        const data: any = MockResponse.data;
        this.items = data._items;
        this.totalCount = data._meta.totalCount;
        this.pageCount = data._meta.pageCount;
        this.currentPage = data._meta.currentPage;
        this.perPage = data._meta.perPage;
    }

}
