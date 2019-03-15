import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../../core/base.compoment';
import {ShipmentService} from './shipment.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {ClientService} from '../../../core/service/client.service';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent extends BaseComponent implements OnInit {
  private list: any = [];
  private filter: any = {};

  constructor(private shipmentService: ShipmentService) {
    super(shipmentService);
  }

  ngOnInit() {
    this.getlist();
  }

  getlist() {
    this.shipmentService.getList('user/api/manifest', {limit: 20, page: 1}).subscribe(res => {
      this.list = res;
      console.log(this.list[0]['id']);
    });
    // this.shipmentService.getList(`user/api/manifest`) .subscribe(res => {
    //
    // });

  }

}
