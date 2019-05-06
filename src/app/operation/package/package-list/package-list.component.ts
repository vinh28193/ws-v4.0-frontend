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
    public listIds: any = [];
    public checkAllOld;
    public filter: any = {
        package_code: '',
        tracking_code: '',
        sku: '',
        order_code: '',
        type_tracking: '',
        status: '',
        limit: 20,
        page: 1,
    };
    @ViewChild('insertTrackingModal') insertTrackingModal: ModalDirective;
    public listChoose: any = [];
    public total = 0;
    public totalWeight = 0;
    public data: any = [];
    public formCreate: any = {
        length: 0,
        width: 0,
        height: 0,
        weight: 0,
    };
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
            status: '',
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
                if (this.data[ind]['hold'] !== 1 && !this.data[ind]['shipment_id'] && !this.data[ind]['delivery_note_id']) {
                    this.checkBoxs[this.getIdCheckBox(this.data[ind]['id'])] = this.checkAll;
                }
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
        if (this.getListIds()) {
            this.insertTrackingModal.show();
        }
    }

    removeList(id) {
        this.checkBoxs[this.getIdCheckBox(id)] = false;
        this.clickCheck();
    }
    createall() {
        if (this.getListIds()) {
            if (this.listIds.length === 0) {
                return this.packageService.popup.error('Dont have item chosen!');
            }
            this.packageService.popup.confirm(() => {
                this.packageService.post('dn', {listPackage: this.listIds, create1vs1: true}).subscribe(rs => {
                    const res: any = rs;
                    if (res.success) {
                        this.packageService.popup.success(res.message);
                        this.insertTrackingModal.hide();
                        this.search();
                    } else {
                        this.packageService.popup.error(res.message);
                    }
                });
            }, 'Do you want create multi delivery not now?', 'Create');
        }
    }
    createDeliveryNote() {
        this.formCreate.weight = this.formCreate.weight ? this.formCreate.weight : this.totalWeight;
        if (this.getListIds()) {
            if (this.listIds.length === 0) {
                return this.packageService.popup.error('Dont have item chosen!');
            }
            this.packageService.post('dn', {listPackage: this.listIds, infoDeliveryNote: this.formCreate}).subscribe(rs => {
                const res: any = rs;
                if (res.success) {
                    this.packageService.popup.success(res.message);
                    this.insertTrackingModal.hide();
                    this.search();
                } else {
                    this.packageService.popup.error(res.message);
                }
            });
        }
    }

    getListIds() {
        this.checkItemCheckBox();
        if (this.listChoose.length > 0) {
            this.listIds = [];
            const ids = [];
            let customer_id = 0;
            let checkHasDN = false;
            $.each(this.listChoose, function (k, v) {
                if (!v.order || (customer_id !== 0 && customer_id !== v.order.customer_id)) {
                    customer_id = 0;
                    return false;
                }
                customer_id = v.order.customer_id;
                if (v.delivery_code) {
                    checkHasDN = true;
                } else {
                    ids.push(v.id);
                }
            });
            if (customer_id === 0 || !customer_id) {
                return this.packageService.popup.error('You must choose the same customer and cannot have unknown!');
            }
            if (checkHasDN) {
                return this.packageService.popup.error('Some package has been included in the delivery note!');
            }
            this.listIds = ids;
            return true;
        }
    }

    outOfDeliveryNote(id) {
        this.packageService.popup.confirm(() => {
            this.packageService.delete('dn/' + id).subscribe(rs => {
                const res: any = rs;
                if (res.success) {
                    this.packageService.popup.success(res.message);
                    this.search();
                } else {
                    this.packageService.popup.error(res.message);
                }
            });
        }, 'Do you want out of delivery not now?', 'Out Of');
    }
}
