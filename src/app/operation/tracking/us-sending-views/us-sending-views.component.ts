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
  @Input() page = 1;
  @Input() limit = 20;
  @Input() total = 0;
  @Output() sellerRefund: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateTracking: EventEmitter<any> = new EventEmitter<any>();
  @Output() mapTrackingU: EventEmitter<any> = new EventEmitter<any>();
  @Output() searchEvent: EventEmitter<any> = new EventEmitter<any>();
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

  search() {
    this.searchEvent.emit({
      page: this.page,
      limit: this.limit,
      total: this.total,
    });
  }

  handlePagination(event) {
    this.page = event.page;
    this.search();
  }

  gettotalPage() {
    return Math.ceil(this.total / this.limit);
  }
}
