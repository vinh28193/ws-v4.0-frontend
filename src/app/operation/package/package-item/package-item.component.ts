import {Component, Input, OnInit} from '@angular/core';
import {PackageDataComponent} from '../package-data.component';
import {PackageService} from '../package.service';
import {PackageItem} from '../package-item';

@Component({
    selector: 'app-package-item',
    templateUrl: './package-item.component.html',
    styleUrls: ['./package-item.component.css']
})
export class PackageItemComponent extends PackageDataComponent implements OnInit {

    @Input() packageItem: any;

    constructor(public packageService: PackageService) {
        super(packageService);
    }

    ngOnInit() {
    }

}
