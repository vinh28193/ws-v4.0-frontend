import { Component, OnInit } from '@angular/core';
import {ShipmentService} from './shipment.service';
import {BaseComponent} from '../../../core/compoment/base.compoment';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent extends BaseComponent implements OnInit {

  constructor(private shipmentService: ShipmentService) {
    super();
  }
  getProcessing = false;
  ngOnInit() {
  }

  getlist(page = 1, manfest = null ) {
  const fd = new FormData();
    // fd.append('filter', JSON.stringify(this.filter));
    this.shipmentService.getList('shipment/list', fd, this.currentPage, this.limit).subscribe(res => {

    });

  }

}
