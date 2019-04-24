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
  @Output() searchEvent: EventEmitter<any> = new EventEmitter<any>();
  public productIds: any = [];
  public filter: any = {
    tracking_code: '',
    sku: '',
    order_code: '',
    type_tracking: '',
  };
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
    this.trackingService.popup.confirm(() => {
      this.trackingService.mapUnknownUS(id, {product_id: this.productIds[id]}).subscribe(rs => {
        const res: any = rs;
        if (res.success) {
          this.trackingService.popup.success(res.message);
          this.search();
        } else {
          this.trackingService.popup.error(res.message);
        }
      });
    }, 'Do you want map product id ' + this.productIds[id] + ' for tracking ' + tracking_code, 'Map');
  }

  search() {
    this.searchEvent.emit({
      page: this.page,
      limit: this.limit,
      total: this.total,
      filter: this.filter
    });
  }

  handlePagination(event) {
    this.page = event.page;
    this.search();
  }

  gettotalPage() {
    return Math.ceil(this.total / this.limit);
  }
  refresh() {
    this.filter = {
      tracking_code: '',
      sku: '',
      order_code: '',
      type_tracking: '',
    };
    this.page = 1;
    this.limit = 20;
    this.search();
  }
}
