import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-package-item',
  templateUrl: './package-item.component.html',
  styleUrls: ['./package-item.component.css']
})
export class PackageItemComponent implements OnInit {
  @Input() packages: any;
  public package: any;
  public check: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  packageEdit(item) {
    this.package = item;
    this.check = true;
  }
  offEditPackage() {
    this.check = false;
  }
}
