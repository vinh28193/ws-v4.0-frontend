import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {ScopeService} from '../../../core/service/scope.service';
import {PackageDataComponent} from '../package-data.component';
import {PackageService} from '../package.service';

@Component({
  selector: 'app-package-view',
  templateUrl: './package-view.component.html',
  styleUrls: ['./package-view.component.css']
})
export class PackageViewComponent extends PackageDataComponent implements OnInit {

  @Input() tab_tracking = '';
  @Input() tracking_codes = '';
  @Output() sellerRefund: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateTracking: EventEmitter<any> = new EventEmitter<any>();
  @Output() searchEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() mergeTracking: EventEmitter<any> = new EventEmitter<any>();
  @Output() markHold: EventEmitter<any> = new EventEmitter<any>();
  @Output() splitTracking: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('viewInsertShipment') viewInsertShipment: ModalDirective;
  public checkAll = false;
  public checkAllOld = false;
  public checkBoxs: any = [];
  public listSelect: any = [];

  constructor(
      public packageService: PackageService,
      public _scope: ScopeService
  ) {
    super(packageService, _scope);
  }

  ngOnInit() {
  }

  getIdCheckBox(id) {
    return 'id_' + id;
  }

  sellerRefundEvent(packTr) {
    this.sellerRefund.emit(packTr);
  }

  markHoldTracking(id, hold) {
    this.markHold.emit({id: id, hold: hold});
  }

  showUpdateForm(item) {
    this.updateTracking.emit(item);
  }

  splitTrackingEvent(item) {
    this.splitTracking.emit(item);
  }
}
