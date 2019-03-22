import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-purchase-card',
  templateUrl: './purchase-card.component.html',
  styleUrls: ['./purchase-card.component.css']
})
export class PurchaseCardComponent implements OnInit {

  constructor() { }
  @Input() product: any;
  @Input() updateProductId: any;

  ngOnInit() {
  }

}
