import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

import {FormBuilder, FormGroup} from '@angular/forms';
import {PackageService} from '../package.service';
import {PopupService} from '../../../core/service/popup.service';
import {ModalDirective} from 'ngx-bootstrap';
import {PackageDataComponent} from '../package-data.component';
import {DomSanitizer} from '@angular/platform-browser';
import {ScopeService} from '../../../core/service/scope.service';

@Component({
    selector: 'app-package-list',
    templateUrl: './package-list.component.html',
    styleUrls: ['./package-list.component.css']
})
export class PackageListComponent extends PackageDataComponent implements OnInit {
    constructor(
        public packageService: PackageService,
        public popUp: PopupService,
        public fb: FormBuilder,
        public sanitizer: DomSanitizer,
        public _scope: ScopeService
    ) {
        super(packageService, _scope);
    }
    ngOnInit() {
        super.ngOnInit();
    }
}
