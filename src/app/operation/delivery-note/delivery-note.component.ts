import {Component, OnInit} from '@angular/core';
import {OperationDataComponent} from '../operation-data.component';
import {OperationService} from '../operation.service';

@Component({
  selector: 'app-delivery-note',
  templateUrl: './delivery-note.component.html',
  styleUrls: ['./delivery-note.component.css']
})
export class DeliveryNoteComponent extends OperationDataComponent implements OnInit {
  private data: any;
  private total = 0;
  private checkAllOld = false;
  private checkBoxs: any = [];

  constructor(public service: OperationService) {
    super(service);
  }

  public filter: any = {
    delivery_note_code: '',
    package_code: '',
    tracking_code: '',
    sku: '',
    order_code: '',
    type_tracking: '',
    status: '',
    limit: 20,
    page: 1,
  };
  checkAll = false;
  ngOnInit() {
    this.filter.delivery_note_code = this.getParameter('deliveryNoteCode');
    this.search();
  }
  search() {
    this.service.get('dn', this.filter).subscribe(res => {
      if (res.success) {
        this.data = res.data.data;
        this.total = res.data.total;
      }
    });
  }

  refresh() {
    this.filter = {
      package_code: '',
      tracking_code: '',
      sku: '',
      order_code: '',
      type_tracking: '',
      status: '',
      limit: 20,
      page: 1,
    };
    this.search();
  }

  gettotalPage() {
    return Math.ceil(this.total / this.filter.limit);
  }
  handlePagination(event) {
    this.filter.page = event.page;
    this.search();
  }

  getIdCheckBox(id) {
    return 'id_' + id;
  }

  clickCheck() {
    if (this.checkAll !== this.checkAllOld) {
      for (let ind = 0; ind < this.data.length; ind++) {
        if (this.data[ind]['hold'] !== 1 && !this.data[ind]['shipment_id'] && !this.data[ind]['delivery_note_id']) {
          this.checkBoxs[this.getIdCheckBox(this.data[ind]['id'])] = this.checkAll;
        }
      }
      this.checkAllOld = this.checkAll;
    } else {
      let check = true;
      for (let ind = 0; ind < this.data.length; ind++) {
        if (!this.checkBoxs[this.getIdCheckBox(this.data[ind]['id'])]) {
          check = false;
        }
      }
      this.checkAllOld = this.checkAll = check;
    }
  }
}
