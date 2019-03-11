import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  @Input() store: any = 0;
  @Output() storeSelect: EventEmitter<any> = new EventEmitter();
  @Input() cssClass: any = 'store_domain';
  // public user: any;
  // public userRole: any;

  constructor() {
  }

  ngOnInit() {
  }

  getStore() {
    this.storeSelect.emit(this.store);
  }
}
