import {Component, OnInit} from '@angular/core';
import {TrackingDataComponent} from '../tracking-data.component';
import {TrackingService} from '../tracking.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PopupService} from '../../../core/service/popup.service';

@Component({
    selector: 'app-tracking-sent',
    templateUrl: './tracking-sent.component.html',
    styleUrls: ['./tracking-sent.component.css']
})
export class TrackingSentComponent extends TrackingDataComponent implements OnInit {

    public form: FormGroup;

    public file: File;

    constructor(public trackingService: TrackingService, public fb: FormBuilder, public popUp: PopupService) {
    }


    ngOnInit() {
        this.buildForm();
    }

    public buildForm() {
        this.form = this.fb.group({
            store: [''],
            manifest: [''],
            warehouse: [''],
            file: ['']
        });
    }

    get store(): string {
        return this.form.get('store').value;
    }

    get warehouses(): any {

        const store = this.store;
        let warehouses = [
            {key: this.allKey, value: '--select store first--'}
        ];
        if (store === '') {
            warehouses = [
                {key: this.allKey, value: '--select store first--'}
            ];
        } else if (store === 'vn') {
            warehouses = [
                {key: 'BMVN_HN', value: 'Boxme Ha Noi (Nam tu liem)'},
                {key: 'BMVN_HCM', value: 'Boxme HCM (45 tan son)'},
            ];
        } else if (store === 'id') {
            warehouses = [
                {key: 'BMID_JKT', value: 'Boxme INDO (Jakata)'},
            ];
        } else {
            warehouses = [
                {key: this.allKey, value: '--select warehouse--'},
                {key: 'BMVN_HN', value: 'Boxme Ha Noi (Nam tu liem)'},
                {key: 'BMVN_HCM', value: 'Boxme HCM (45 tan son)'},
                {key: 'BMID_JKT', value: 'Boxme INDO (Jakata)'},
            ];
        }
        this.form.patchValue({warehouse: warehouses[0].key});
        return warehouses;
    }

    public handleFileChange(event) {
        this.file = event.target.files[0];
    }


    public preSent() {
        const value = this.form.getRawValue();
        if (typeof this.file === 'undefined') {
            this.popUp.error('no file update ?');
        }
        const fd = new FormData();
        fd.append('store', value.store);
        fd.append('warehouse', value.warehouse);
        fd.append('manifest', value.manifest);
        fd.append('file', this.file);
        return fd;
    }

    public create() {
        this.trackingService.create(this.preSent()).subscribe(res => {
            console.log(res);
        });
    }
}
