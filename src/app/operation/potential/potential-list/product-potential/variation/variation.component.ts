import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-variation',
  templateUrl: './variation.component.html',
  styleUrls: ['./variation.component.css']
})
export class VariationComponent implements OnInit {
  @Input() variation: any;
  variants: any = [];
  oldVariant: any = [];

  constructor() {
  }

  ngOnInit() {
    if (this.variation) {
      this.oldVariant = (this.variation.options_group);
      console.log(this.oldVariant);
    }
  }

}
