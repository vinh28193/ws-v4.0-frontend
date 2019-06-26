import {Component, OnInit, ViewChild} from '@angular/core';
import {OperationDataComponent} from '../operation-data.component';
import {OperationService} from '../operation.service';
import {isArray} from 'util';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent extends OperationDataComponent implements OnInit {
    constructor(public http: OperationService) {
        super(http);
    }
    @ViewChild(ModalDirective) AddUser: ModalDirective;
    public userSearchForm = {
        id: '',
        username: '',
        email: '',
        phone: '',
        type: '',
        active: '',
        limit: 20,
        page: 1,
    };
    public modelUser = {
        id: '',
        username: '',
        email: '',
        phone: '',
        employee: 1,
        status: 1,
        remove: 0,
        type_customer: 1,
        facebook_acc_kit_id: '',
        bm_wallet_id: '',
        authAssigments: '',
        first_name: '',
        last_name: '',
        locale: 'vi-VN',
        store_id: 1,
        token_apn: '',
        token_fcm: '',
        uuid: '',
        vip: 0,
        password: '',
        reset_pass: '',
    };
    public data: any;

    ngOnInit() {
        this.searchForm();
    }

    searchForm() {
        this.http.get('u', this.userSearchForm).subscribe(res => {
            if (res.success) {
                this.data = res.data;
            } else {
                this.http.popup.error('Search Fail');
            }
        });
    }
    gettype(type) {
        switch (parseInt(type)) {
            case 1:
                return 'Employee Ha Noi';
                break;
            case 2:
                return 'Employee HCM';
                break;
            case 0:
                return 'Customer';
                break;
            default:
                return 'Customer';
                break;
        }
    }

    getScopes(assigments) {
        let scopes = '';
        if (assigments && assigments.length > 0 && isArray(assigments)) {
            for (let i = 0; i < assigments.length; i++) {
                scopes += i === 0 ? assigments[i].item_name : ',' + assigments[i].item_name;
            }
        }
        return scopes;
    }

    CreateAccount() {
        this.http.post('u', this.modelUser).subscribe(res => {
            const rs: any = res;
            if (rs.success) {
                this.http.popup.success(rs.message);
                this.setDefaultModelUser();
                this.AddUser.hide();
            } else {
                this.http.popup.error(rs.message);
            }
        });
    }

    showUpdate(user) {
        this.modelUser = user;
        this.modelUser.authAssigments = this.getScopes(user.scopeAuth);
        this.AddUser.show();
    }
    setDefaultModelUser() {
        this.modelUser = {
            id: '',
            username: '',
            email: '',
            phone: '',
            employee: 1,
            status: 1,
            remove: 0,
            type_customer: 1,
            facebook_acc_kit_id: '',
            bm_wallet_id: '',
            authAssigments: '',
            first_name: '',
            last_name: '',
            locale: 'vi-VN',
            store_id: 1,
            token_apn: '',
            token_fcm: '',
            uuid: '',
            vip: 0,
            password: '',
            reset_pass: '',
        };
    }
    update() {
        this.http.put('u/' + this.modelUser.id, this.modelUser).subscribe(res => {
            const rs: any = res;
            if (rs.success) {
                this.http.popup.success(rs.message);
                this.setDefaultModelUser();
                this.AddUser.hide();
            } else {
                this.http.popup.error(rs.message);
            }
        });
    }
}
