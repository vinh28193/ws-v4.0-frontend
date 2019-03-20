import {Component, OnInit} from '@angular/core';
import {TrackingDataComponent} from '../tracking-data.component';
import {TrackingService} from '../tracking.service';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-tracking-list',
    templateUrl: './tracking-list.component.html',
    styleUrls: ['./tracking-list.component.css']
})
export class TrackingListComponent extends TrackingDataComponent implements OnInit {

    public trackings: any = [];
    public summary: any = {};

    public searchForm: FormGroup;

    constructor(public trackingService: TrackingService) {
        super(trackingService);
    }

    ngOnInit() {
    }

}
