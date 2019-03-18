import { OnInit } from '@angular/core';
import {OperationDataComponent} from '../operation-data.component';
import {ClientService} from '../../core/service/client.service';

export class PackageDataComponent extends OperationDataComponent implements OnInit {

    constructor(public http: ClientService) {
        super(http);
    }

  ngOnInit() {
  }

}
