import { Component, OnInit } from '@angular/core';
import {ShipmentService} from './shipment.service';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent  implements OnInit {

  constructor(private shipmentService: ShipmentService) {
  }
  getProcessing = false;
  ngOnInit() {
  }
}
