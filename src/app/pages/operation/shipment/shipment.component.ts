import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../../../core/base.compoment';
import {ShipmentService} from './shipment.service';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent extends BaseComponent implements OnInit {
  private list: any = [];
  private filter: any = {};
  private fb: FormData;

  constructor(private shipmentService: ShipmentService) {
    super();
  }
  ngOnInit() {
    this.getlist();
  }
  getlist() {
    this.shipmentService.list('user/api/manifest', this.limit).subscribe(res => {
      this.list = res.data;
    });

  }
}
