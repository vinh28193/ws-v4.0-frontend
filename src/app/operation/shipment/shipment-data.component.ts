import {OnInit} from '@angular/core';
import {OperationDataComponent} from '../operation-data.component';
import {ShipmentService} from './shipment.service';

export class ShipmentDataComponent extends OperationDataComponent implements OnInit {
  public warehouses: any = [];
    constructor(public http: ShipmentService) {
      super(http);
    }

    loadWarehouse(refresh = false) {
      this.warehouses = this.http.decrypt('warehouses');
      this.warehouses = JSON.parse(this.warehouses);
      const wait = this.http.decrypt('loading-warehouse');
      if ((!this.http.isValidValue(this.warehouses) && wait !== 'wait') || refresh) {
          this.http.encrypt('loading-warehouse', 'wait');
          this.http.get('wh', undefined).subscribe(res => {
              this.warehouses = res;
              this.http.encrypt('warehouses', JSON.stringify(this.warehouses));
              this.http.encrypt('loading-warehouse', 'done');
          });
    }
    return this.warehouses;
  }

  ngOnInit() {
  }

}
