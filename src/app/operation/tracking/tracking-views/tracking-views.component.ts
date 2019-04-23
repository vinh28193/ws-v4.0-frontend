import {Component, Input, OnInit} from '@angular/core';
import {TrackingDataComponent} from '../tracking-data.component';
import {TrackingService} from '../tracking.service';

@Component({
  selector: 'app-tracking-views',
  templateUrl: './tracking-views.component.html',
  styleUrls: ['./tracking-views.component.css']
})
export class TrackingViewsComponent extends TrackingDataComponent implements OnInit {

  @Input() tab_tracking = '';
  @Input() tracking_codes = '';
  constructor(
      public trackingService: TrackingService,
  ) {
    super(trackingService);
  }

  ngOnInit() {
  }

}
