import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paging-custom',
  templateUrl: './paging-custom.component.html',
  styleUrls: ['./paging-custom.component.css']
})
export class PagingCustomComponent implements OnInit {

  @Input() limit_page = 10;
  @Input() total = 0;
  @Input() limit = 20;
  @Input() page = 1;
  @Output() clickFn: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  getTotalPageArray() {
    const count = Math.ceil(this.total / this.limit);
    const arr = [];
    const tb = Math.ceil(this.limit_page / 2);
    for (let ind = 0; ind < count; ind++) {
      if (count > this.limit_page) {
        if (this.page <= tb) {
          if (this.limit_page >= ind + 1) {
            arr.push(ind + 1);
          }
        } else {
          if ((ind + 1 > this.page - tb && this.page + tb > ind + 1)) {
            arr.push(ind + 1);
          }
        }
      } else {
        arr.push(ind + 1);
      }
    }
    return arr;
  }

  selectPage(page) {
    this.clickFn.emit({page: page});
  }

  getTotalPage() {
    return Math.floor(this.total / this.limit);
  }

}
