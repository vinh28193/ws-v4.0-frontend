import {Component, OnInit} from '@angular/core';
import {TrackingDataComponent} from '../tracking-data.component';
import {TrackingService} from '../tracking.service';
import {FormBuilder, FormGroup} from '@angular/forms';

import {TRACKINGS} from '../mock-tracking';
import {PopupService} from '../../../core/service/popup.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-tracking-list',
    templateUrl: './tracking-list.component.html',
    styleUrls: ['./tracking-list.component.css']
})
export class TrackingListComponent extends TrackingDataComponent implements OnInit {

    public trackings: any = [];
    public summary: any = {};

    public searchForm: FormGroup;

    constructor(
        public trackingService: TrackingService,
        public popUp: PopupService,
        public fb: FormBuilder,
        public sanitizer: DomSanitizer
    ) {
        super(trackingService);
    }

    ngOnInit() {
        this.buildSearchForm();
        this.search();
        console.log(this.summary);
    }

    buildSearchForm() {

    }

    search() {
        const data: any = TRACKINGS.data;
        this.trackings = data._items;
        this.summary = data._summary[0];
        this.totalCount = data._meta.totalCount;
        this.pageCount = data._meta.pageCount;
        this.currentPage = data._meta.currentPage;
        this.perPage = data._meta.perPage;
    }

    handlePerPage(perPage) {
    }

    handlePagination(page) {
    }

}
