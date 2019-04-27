import {Component, Input, OnInit} from '@angular/core';
import {TrackingDataComponent} from '../tracking-data.component';
import {TrackingService} from '../tracking.service';
import {ScopeService} from '../../../core/service/scope.service';

@Component({
  selector: 'app-tracking-info',
  templateUrl: './tracking-info.component.html',
  styleUrls: ['./tracking-info.component.css']
})
export class TrackingInfoComponent extends TrackingDataComponent implements OnInit {
  @Input() packTr: any = [];
  constructor(
      http: TrackingService,
      public _scope: ScopeService
      ) {
    super(http,_scope);
  }

  ngOnInit() {
  }

}
