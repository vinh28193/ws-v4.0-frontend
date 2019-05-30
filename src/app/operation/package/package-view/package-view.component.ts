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
  @Input() tracking_codes: any = {};
  @Output() sellerRefund: EventEmitter<any> = new EventEmitter<any>();
  @Output() updatePackage: EventEmitter<any> = new EventEmitter<any>();
  @Output() searchEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() mergeTracking: EventEmitter<any> = new EventEmitter<any>();
  @Output() markHold: EventEmitter<any> = new EventEmitter<any>();
  @Output() splitTracking: EventEmitter<any> = new EventEmitter<any>();
  @Output() viewLogs: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('viewInsertShipment') viewInsertShipment: ModalDirective;
  public checkAll = false;
  public checkAllOld = false;
  public checkBoxs: any = [];
  public listSelect: any = [];
  public tracking_codes_rs: any = {};
  public formSearchPackage: any = {
    manifest_id: '',
    package_code: '',
    tracking_code: '',
    order_code: '',
    product_id: '',
    customer_id: '',
    phone: '',
    name: '',
    email: '',
    status_create: '',
  };
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
    this.updatePackage.emit(item);
  }

  splitTrackingEvent(item) {
    this.splitTracking.emit(item);
  }

  viewLog(event) {
    this.viewLogs.emit(event);
  }

  searchPackage() {
    this.formSearchPackage.manifest_id = this.tracking_codes.length > 0 ? this.tracking_codes[0].manifest_id : null;
    console.log(this.formSearchPackage.manifest_id);
    this.packageService.get('package', this.formSearchPackage).subscribe(rs => {
      if (rs.success) {
        this.tracking_codes = rs.data.data;
      } else {
        this.packageService.popup.error(rs.message);
      }
    });
  }

  searchFastPackage() {
    let rs = this.tracking_codes_rs;
    let match = '';
    if (this.formSearchPackage.customer_id) {
      match = this.formSearchPackage.customer_id;
      rs = rs.filter(c => c.order.customer_id === match);
    }
    if (this.formSearchPackage.tracking_code) {
      match = this.formSearchPackage.tracking_code;
      rs = rs.filter(c => c.tracking_code.toUpperCase() === match.toUpperCase());
    }
    if (this.formSearchPackage.status_create === 'create') {
      rs = rs.filter(c => c.delivery_note_code === null || c.delivery_note_code === '');
    }
    if (this.formSearchPackage.status_create === 'create') {
      rs = rs.filter(c => c.delivery_note_code !== null || c.delivery_note_code !== '');
    }
    if (this.formSearchPackage.product_id) {
      match = this.formSearchPackage.product_id;
      rs = rs.filter(c => c.product_id === match);
    }
    if (this.formSearchPackage.phone) {
      match = this.formSearchPackage.phone;
      rs = rs.filter(c => c.order.phone.toUpperCase() === match.toUpperCase());
    }
    if (this.formSearchPackage.order_code) {
      match = this.formSearchPackage.order_code;
      rs = rs.filter(c => c.order.order_code.toUpperCase() === match.toUpperCase());
    }
    if (this.formSearchPackage.email) {
      match = this.formSearchPackage.email;
      rs = rs.filter(c => c.order.email.toUpperCase() === match.toUpperCase());
    }
    this.tracking_codes = rs;
    this.getTrackingCodes();
  }

  getTrackingCodes() {
    if (this.tracking_codes_rs.length <= this.tracking_codes.length) {
      this.tracking_codes_rs = this.tracking_codes;
    }
    return this.tracking_codes;
  }
}
