import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TrackingService} from '../tracking.service';
import {TrackingDataComponent} from '../tracking-data.component';

@Component({
  selector: 'app-us-sending-views',
  templateUrl: './us-sending-views.component.html',
  styleUrls: ['./us-sending-views.component.css']
})
export class UsSendingViewsComponent extends TrackingDataComponent implements OnInit {

  @Input() tab_tracking = '';
  @Input() tracking_codes = '';
  @Output() sellerRefund: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateTracking: EventEmitter<any> = new EventEmitter<any>();
  @Output() mapTrackingU: EventEmitter<any> = new EventEmitter<any>();
  public productIds: any = [];
  constructor(
      public trackingService: TrackingService,
  ) {
    super(trackingService);
  }

  ngOnInit() {
  }

  showSellerRefundModal(park) {
    this.sellerRefund.emit(park);
  }

  showUpdateForm(packTr) {
    this.updateTracking.emit(packTr);
  }

  mapUnknown(id, tracking_code) {
    this.mapTrackingU.emit({id: id, tracking_code: tracking_code});
  }
}
