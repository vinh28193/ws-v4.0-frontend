import {OnInit} from '@angular/core';
import {OperationDataComponent} from '../operation-data.component';
import {TrackingService} from './tracking.service';

export class TrackingDataComponent extends OperationDataComponent implements OnInit {

    constructor(public http: TrackingService) {
        super(http);
    }

    ngOnInit() {
    }

}
