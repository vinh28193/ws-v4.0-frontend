import {OnInit} from '@angular/core';
import {OperationDataComponent} from '../operation-data.component';
import {TrackingService} from './tracking.service';
import {Select2OptionData} from 'ng2-select2';

export class TrackingDataComponent extends OperationDataComponent implements OnInit {

    public manifestSelect2Data: Select2OptionData[];

    constructor(public http: TrackingService) {
        super(http);
    }

    ngOnInit() {
    }
    getListImage(images) {
        if (images) {
            return images.split(',');
        }
        return false;
    }
}
