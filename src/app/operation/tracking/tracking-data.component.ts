import {OnInit} from '@angular/core';
import {OperationDataComponent} from '../operation-data.component';
import {TrackingService} from './tracking.service';
import {Select2OptionData} from 'ng2-select2';
import {ScopeService} from '../../core/service/scope.service';

export class TrackingDataComponent extends OperationDataComponent implements OnInit {

    public manifestSelect2Data: Select2OptionData[];

    constructor(
        public http: TrackingService,
        public _scope: ScopeService
    ) {
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
