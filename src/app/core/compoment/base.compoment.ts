import {NotifyUltis} from '../utility/notify.ultis';
import {EventEmitter, Output} from '@angular/core';
import {environment} from '../../../environments/environment';
import {isArray} from 'util';

/**
 * Created by Thaim on 6/29/2017.
 */


export class BaseComponent extends NotifyUltis {

    public limit = 20;
    public currentPage = 1;
    public total = 0;
    public scope;
    public store;
    public userInfo;
    public rowSelected = -1;
    @Output() activity: EventEmitter<any> = new EventEmitter();

    constructor() {
        super();
        this.scope = this.decrypt('scope');
        this.userInfo = this.decrypt('loginUser');
        this.store = localStorage.getItem('store_domain');
    }

    getLocalCurrencyFormat(currency) {
        switch (Number(currency)) {
            case 2:
                return '4.2-2';
            case 3:
                return '4.2-2';
            case 5:
                return '4.2-2';
            case 6:
                return '4.2-2';
            case 7:
                return '4.0';
            case 9:
                return '4.0';
            case 10:
                return '4.0';
            case 1:
                return '4.0';
        }
    }

    selectRow(row) {
        if (this.rowSelected === -1) {
            this.rowSelected = row;
        } else {
            if (this.rowSelected === row) {
                this.rowSelected = -1;
            } else {
                this.rowSelected = row;
            }

        }
    }

    getLocalCurrencyCode(curency) {
        switch (Number(curency)) {
            case 2:
                return 'RMB';
            case 3:
                return 'USD';
            case 5:
                return 'MYR';
            case 6:
                return 'SGD';
            case 7:
                return 'IDR';
            case 9:
                return 'PHP';
            case 10:
                return 'THB';
            case 1:
                return 'VND';
        }
    }

    getLocalCurrencyCodeByStore($store = null) {
        if ($store === null) {
            $store = this.getStoreId();
        }
        switch (Number($store)) {
            case 6:
                return 'MYR';
            case 7:
                return 'IDR';
            case 9:
                return 'PHP';
            case 10:
                return 'THB';
            case 1:
                return 'đ';
            default:
                return '$';
        }
    }


    getStoreId($storeCode = null) {
        if ($storeCode === null) {
            $storeCode = localStorage.getItem('store_domain');
        }
        switch ($storeCode) {
            case 'MY':
                return 6;
            case 'ID':
                return 7;
            case 'PH':
                return 9;
            case 'TH':
                return 10;
            case 'VN':
                return 1;
            case 'US':
                return 4;
            default:
                return '';
        }
    }

    getWarehouse(storeId = null) {
        if (storeId === null) {
            storeId = this.getStoreId();
        }
        switch (Number(storeId)) {
            case 1:
                return 2;
            case 6:
                return 11;
            case 7:
                return 5;
        }
    }

    checkScope(roles: any = []) {
        return roles.indexOf(this.scope) !== -1;
        //   if(this.userInfo.list_scopes && this.userInfo.list_scopes.length > 0 && isArray(this.userInfo.list_scopes)){
        //     var check = false;
        //     for (let ind = 0; ind < this.userInfo.list_scopes.length ; ind ++){
        //       if (roles.indexOf(this.userInfo.list_scopes[ind]) !== -1){
        //         check = true;
        //         stop();
        //       }
        //     }
        //     return check;
        //   }else {
        //     return roles.indexOf(this.scope) !== -1;
        //   }
    }

    checkMasterWarehouseAccess() {
        return this.checkScope(['admin', 'master_warehouse']);
    }
    checkWarehouseAccess() {
        return this.checkMasterWarehouseAccess() || this.checkScope(['admin', 'warehouse']);
    }
    checkMasterOperationAccess() {
        return this.checkScope(['admin', 'master_operation']);
    }
    checkOperationAccess() {
        return this.checkMasterOperationAccess() || this.checkScope(['operation', 'admin']);
    }

    checkAccountanceAccess() {
        return this.checkScope(['accountance', 'admin']);
    }

    checkMasterCmsAccess() {
        return this.checkScope(['admin', 'master_cms']);
    }

    checkCmsAccess() {
        return this.checkMasterCmsAccess() ||  this.checkScope(['cms', 'admin']);
    }

    checkMasterSaleAccess() {
        return this.checkScope(['master_sale', 'admin']);
    }
    checkSaleAccess() {
        return this.checkMasterSaleAccess() || this.checkScope(['sale', 'admin']);
    }

    checkAdminAccess() {
        return this.checkScope(['admin']);
    }
}
