import {Component, OnInit} from '@angular/core';
import {OperationDataComponent} from '../operation-data.component';
import {OperationService} from '../operation.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent extends OperationDataComponent implements OnInit {

    constructor(public http: OperationService) {
        super(http);
    }

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
        switch (type) {
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
}
