import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-span-label',
  templateUrl: './span-label.component.html',
  styleUrls: ['./span-label.component.css']
})
export class SpanLabelComponent implements OnInit {

  @Input() value: any;
  @Input() category = 'none';
  @Input() cssClass = '';
  @Input() nullValue = 'Empty';
  @Input() categoryNullValue = 'danger';

  constructor() {
  }


  ngOnInit() {
  }

  isEmpty(value) {
    return typeof value === 'undefined' || value === '' || value === null;
  }

  getContent() {
    if (this.isEmpty(this.value)) {
      return this.nullValue;
    }
    return this.value;
  }

  getCssClass() {
    let category = this.category;
    if (this.isEmpty(this.value)) {
      category = this.categoryNullValue;
    }

    let categoryCss = 'label label-' + category;
    if (category === 'none') {
      categoryCss = '';
    }
    if (
      typeof this.cssClass !== 'undefined' &&
      this.cssClass !== null &&
      this.cssClass !== '' &&
      this.cssClass !== 'label' &&
      this.cssClass !== categoryCss
    ) {
      categoryCss += ' ' + this.cssClass;
    }
    return categoryCss;
  }
}
