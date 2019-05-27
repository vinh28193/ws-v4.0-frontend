import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OperationDataComponent} from '../../operation-data.component';
import {OperationService} from '../../operation.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent extends OperationDataComponent implements OnInit {

  constructor(public service: OperationService) {
    super(service);
  }
  @Input() wallet_merchant_id;
  @Input() wallet_client_id;
  @Output() dataLoaded: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit() {
  }

}
