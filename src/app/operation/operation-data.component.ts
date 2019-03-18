import {OnInit} from '@angular/core';
import {PresentComponent} from '../present.component';
import {ClientService} from '../core/service/client.service';

export class OperationDataComponent extends PresentComponent implements OnInit {

    constructor(public http: ClientService) {
        super(http);
    }

    ngOnInit() {
    }

}
