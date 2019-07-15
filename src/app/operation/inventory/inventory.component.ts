import {Component, OnInit} from '@angular/core';
import {OperationDataComponent} from '../operation-data.component';
import {InventoryService} from './inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent extends OperationDataComponent implements OnInit {

  constructor(public http: InventoryService) {
    super(http);
  }

  ngOnInit() {
  }

}
