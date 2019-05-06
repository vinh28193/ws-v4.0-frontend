import {Component, OnInit, ViewChild} from '@angular/core';

import {FormBuilder} from '@angular/forms';
import {PackageService} from '../package.service';
import {PackageDataComponent} from '../package-data.component';
import {ScopeService} from '../../../core/service/scope.service';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
    selector: 'app-package-list',
    templateUrl: './package-list.component.html',
    styleUrls: ['./package-list.component.css']
})
export class PackageListComponent extends PackageDataComponent implements OnInit {
    constructor(
        public packageService: PackageService,
        public fb: FormBuilder,
        public _scope: ScopeService
    ) {
        super(packageService, _scope);
    }

    public chooseTabCreate = true;
    public checkAll;
    public checkBoxs: any = [];
    public checkAllOld;
    public filter: any = {
        package_code: '',
        tracking_code: '',
        sku: '',
        order_code: '',
        type_tracking: '',
        limit: 20,
        page: 1,
    };
    @ViewChild('insertTrackingModal') insertTrackingModal: ModalDirective;
    public listChoose: any = [];
    public total = 0;
    public totalWeight = 0;
    public data: any = [];
    public formCreate: any = [];
    productIds: any = [];
    ngOnInit() {
        super.ngOnInit();
        this.search();
    }

    search() {
        this.packageService.get('p', this.filter).subscribe(res => {
            if (res.success) {
                this.data = res.data.data;
                this.total = res.data.total;
            }
        });
    }

    refresh() {
        this.filter = {
            package_code: '',
            tracking_code: '',
            sku: '',
            order_code: '',
            type_tracking: '',
            limit: 20,
            page: 1,
        };
        this.search();
    }

    gettotalPage() {
        return Math.ceil(this.total / this.filter.limit);
    }

    handlePagination(event) {
        this.filter.page = event.page;
        this.search();
    }

    getIdCheckBox(id) {
        return 'id_' + id;
    }

    clickCheck() {
        if (this.checkAll !== this.checkAllOld) {
            for (let ind = 0; ind < this.data.length; ind++) {
                this.checkBoxs[this.getIdCheckBox(this.data[ind]['id'])] = this.checkAll;
            }
            this.checkAllOld = this.checkAll;
        } else {
            let check = true;
            for (let ind = 0; ind < this.data.length; ind++) {
                if (!this.checkBoxs[this.getIdCheckBox(this.data[ind]['id'])]) {
                    check = false;
                }
            }
            this.checkAllOld = this.checkAll = check;
        }
    }

    checkItemCheckBox() {
        let check = 0;
        this.totalWeight = 0;
        this.listChoose = [];
        for (let ind = 0; ind < this.data.length; ind++) {
            if (this.checkBoxs[this.getIdCheckBox(this.data[ind]['id'])]) {
                this.listChoose.push(this.data[ind]);
                this.totalWeight += parseFloat(this.data[ind].weight + '');
                check++;
            }
        }
        return check;
    }

    mapUnknown(id, tracking_code) {
        this.packageService.popup.confirm(() => {
            this.packageService.mapUnknownUS(id, {product_id: this.productIds[id]}).subscribe(rs => {
                const res: any = rs;
                if (res.success) {
                    this.packageService.popup.success(res.message);
                    this.search();
                } else {
                    this.packageService.popup.error(res.message);
                }
            });
        }, 'Do you want merge product id : ' + this.productIds[id] + ' enter tracking code ' + tracking_code + '?', 'merge');
    }

    showDeliveryNoteModal() {
        this.insertTrackingModal.show();
    }

    removeList(id) {
        this.checkBoxs[this.getIdCheckBox(id)] = false;
        this.clickCheck();
    }
    createall() {

    }
}
