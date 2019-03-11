import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shipment-item',
  templateUrl: './shipment-item.component.html',
  styleUrls: ['./shipment-item.component.css']
})
export class ShipmentItemComponent implements OnInit {

  itemFilters: any = {};
  constructor() { }

  ngOnInit() {
  }

  hasFilter(key) {
    return this.itemFilters.hasOwnProperty(key);
  }

  createFilterFormKey(key, defaultValue, canRemove = true) {
    if (this.hasFilter(key) && canRemove) {
      const thatFilter = this.itemFilters;
      delete thatFilter[key];
      this.itemFilters = thatFilter;
      if (canRemove) {
        // this.getManifestItem();
      }
    } else {
      this.itemFilters[key] = defaultValue;
    }
  }

}
