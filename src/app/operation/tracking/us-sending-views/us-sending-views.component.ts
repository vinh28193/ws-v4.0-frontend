import {Component, Input, OnInit} from '@angular/core';
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
  public productIds: any = [];
  constructor(
      public trackingService: TrackingService,
  ) {
    super(trackingService);
  }

  ngOnInit() {
  }

}
