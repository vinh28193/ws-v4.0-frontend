import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css']
})
export class EditImageComponent implements OnInit {

  constructor() { }
  @Input() image: any = null;
  @Input() idImage: any = null;

  ngOnInit() {
  }

}
