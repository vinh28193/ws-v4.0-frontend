import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../core/base.compoment';

import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-package-list',
    templateUrl: './package-list.component.html',
    styleUrls: ['./package-list.component.css']
})
export class PackageListComponent extends BaseComponent implements OnInit {

    // form Group
    public searchForm: FormGroup;

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit() {
    }

    buildForm() {
        this.searchForm = this.fb.group({

        });
    }
}
