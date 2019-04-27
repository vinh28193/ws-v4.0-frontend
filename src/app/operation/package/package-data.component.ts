import { OnInit } from '@angular/core';
import {OperationDataComponent} from '../operation-data.component';
import {ClientService} from '../../core/service/client.service';
import {TrackingService} from '../tracking/tracking.service';
import {ScopeService} from '../../core/service/scope.service';
import {PackageDraftService} from './package-draft/package-draft.service';
import {PackageService} from './package.service';

export class PackageDataComponent extends OperationDataComponent implements OnInit {

    constructor(
        public http: PackageService,
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
