import {Component, OnInit} from '@angular/core';
import {PackageDataComponent} from '../package-data.component';
import {PackageDraftService} from './package-draft.service';
import {FormGroup} from '@angular/forms';
import {PopupService} from '../../../core/service/popup.service';

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
    constructor(public draftPackageService: PackageDraftService, public popup: PopupService) {
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
        this.draftPackageService.search({p: this.currentPage, l: this.perPage}).subscribe(rs => {
            if (rs.success) {
                const data: any = rs.data;
                this.items = data._items;
                this.totalCount = data._total;
            } else {
                this.popup.error(rs.message);
            }
        });
    }

    handlePagination(event) {
        if (this.currentPage !== event.page) {
            this.currentPage = event.page;
            this.perPage = event.itemsPerPage;
            this.search();
        }
    }

    handlePerPage(event) {

    }

    getListImage(images) {
        return images.split(',');
    }
}
