import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-wallet-transactions',
  templateUrl: './wallet-transactions.component.html',
  styleUrls: ['./wallet-transactions.component.css']
})
export class WalletTransactionsComponent implements OnInit {
  @Input() walletTransactions: any;

  constructor() { }

  ngOnInit() {
  }

}
