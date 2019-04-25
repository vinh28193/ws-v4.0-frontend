import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TrackingDataComponent} from '../tracking-data.component';
import {TrackingService} from '../tracking.service';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-tracking-views',
  templateUrl: './tracking-views.component.html',
  styleUrls: ['./tracking-views.component.css']
})
export class TrackingViewsComponent extends TrackingDataComponent implements OnInit {

  @Input() tab_tracking = '';
  @Input() tracking_codes = '';
  @ViewChild('viewInsertShipment') viewInsertShipment: ModalDirective;
  public checkAll = false;
  public checkAllOld = false;
  public checkBoxs: any = [];
  public listSelect: any = [];
  constructor(
      public trackingService: TrackingService,
  ) {
    super(trackingService);
  }

  ngOnInit() {
  }

  clickCheck() {
    if (this.checkAll !== this.checkAllOld) {
      for (let ind = 0; ind < this.tracking_codes.length; ind++) {
        this.checkBoxs[this.getIdCheckBox(this.tracking_codes[ind]['id'])] = this.checkAll;
      }
      this.checkAllOld = this.checkAll;
    } else {
      let check = true;
      for (let ind = 0; ind < this.tracking_codes.length; ind++) {
        if (!this.checkBoxs[this.getIdCheckBox(this.tracking_codes[ind]['id'])]) {
          check = false;
        }
      }
      this.checkAllOld = this.checkAll = check;
    }
  }

  getIdCheckBox(id) {
    return 'id_' + id;
  }

  insertShippment() {
    console.log(this.checkBoxs);
    this.trackingService.post('s-tracking-code/insert-shipment', {listCheck: this.getListId()}).subscribe(
        rs => {
          const res: any = rs;
          if (res.success) {
            this.trackingService.popup.success(res.message);
            this.viewInsertShipment.hide();
          } else {
            this.trackingService.popup.error(res.message);
          }
        }
    );
  }

  getListId() {
    const arr = [];
    $.each(this.listSelect, function (k, v) {
      arr.push(v['id']);
    });
    return arr;
  }

  insertShippmentAll() {
    this.trackingService.post('s-tracking-code/insert-shipment', {manifest_id: this.tracking_codes[0]['manifest_id']}).subscribe(
        rs => {
          const res: any = rs;
          if (res.success) {
            this.trackingService.popup.success(res.message);
            this.viewInsertShipment.hide();
          } else {
            this.trackingService.popup.error(res.message);
          }
        }
    );
  }

  showInsertShipmentModel() {
    this.listSelect = [];
    for (let ind = 0; ind < this.tracking_codes.length; ind++) {
      if (this.checkBoxs[this.getIdCheckBox(this.tracking_codes[ind]['id'])]) {
        if (this.listSelect.length) {
          if (this.listSelect[0]['order']['customer_id'] !== this.tracking_codes[ind]['order']['customer_id']) {
            return this.trackingService.popup.error('Please select only customer id!');
          }
        }
        this.listSelect.push(this.tracking_codes[ind]);
      }
    }
    if (!this.listSelect) {
      return this.trackingService.popup.error('Please select only customer id!');
    }
    this.viewInsertShipment.show();
  }

  getTotalWeight() {
    let weight = 0;
    $.each(this.listSelect, function (k, v) {
      weight += parseFloat(v['weight']);
    });
    return weight;
  }
}
