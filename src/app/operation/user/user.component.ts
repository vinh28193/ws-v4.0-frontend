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
        employee: '',
        status: '',
        remove: '',
        type_customer: '',
        facebook_acc_kit_id: '',
        bm_wallet_id: '',
        authAssigments: '',
        first_name: '',
        last_name: '',
        locale: '',
        store_id: '',
        token_apn: '',
        token_fcm: '',
        uuid: '',
        vip: '',
        password: '',
    };
    public data: any;

    ngOnInit() {
        this.searchForm();
    }

    searchForm() {
        this.http.get('user', this.userSearchForm).subscribe(res => {
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
                scopes += i === 0 ? assigments[i].item_name : ' | ' + assigments[i].item_name;
            }
        }
        return scopes;
    }
}
