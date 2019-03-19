import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-edit-variant',
  templateUrl: './edit-variant.component.html',
  styleUrls: ['./edit-variant.component.css']
})
export class EditVariantComponent implements OnInit {
  @Input() id: any = null;
  @Input() variant: any = null;
  constructor() { }

  ngOnInit() {
  }

}
