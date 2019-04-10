import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {EncryptionService} from './encryption.service';
import {environment} from '../../../environments/environment.prod';
import {isArray, isString} from 'util';

@Injectable({
    providedIn: 'root'
})
export class ScopeService {
    public _scope: any;
    public checkSale() {
        if (localStorage.getItem('scope') === ('sale')) {
            return true;
        }
    }

    public checkMasterSale() {
        if (localStorage.getItem('scope') === ('master_sale')) {
            return true;
        }
    }

    public checkOperatione() {
        if (localStorage.getItem('scope') === ('operation')) {
            return true;
        }
    }

    public checkMasterOperation() {
        if (localStorage.getItem('scope') === ('master_operation')) {
            return true;
        }
    }

    public checkPurchase() {
        if (localStorage.getItem('scope') === ('purchase')) {
            return true;
        }
    }

    public checkMarketingIntent() {
        if (localStorage.getItem('scope') === ('marketing_intent')) {
            return true;
        }
    }

    public checkMarketingAds() {
        if (localStorage.getItem('scope') === ('marketing_ads')) {
            return true;
        }
    }

    public checkMarketing() {
        if (localStorage.getItem('scope') === ('marketing')) {
            return true;
        }
    }

    public checkMasterMarketing() {
        if (localStorage.getItem('scope') === ('master.marketing')) {
            return true;
        }
    }

    public checkMasterAccountant() {
        if (localStorage.getItem('scope') === ('master.accountant')) {
            return true;
        }
    }

    public checkAccountant() {
        if (localStorage.getItem('scope') === ('accountant')) {
            return true;
        }
    }


    public checkWarehouse() {
        if (localStorage.getItem('scope') === ('warehouse')) {
            return true;
        }
    }

    public checkSuperAdmin() {
        if (localStorage.getItem('scope') === ('superAdmin')) {
            return true;
        }
    }

    public checkTester() {
        if (localStorage.getItem('scope') === ('tester')) {
            return true;
        }
    }

  public CheckSale() {
    if (this.checkSale() || this.checkMasterSale() || this.checkSuperAdmin()) {
      return true;
    }
  }
  public checkMarketingAccount() {
      if (this.checkMarketing() || this.checkAccountant() || this.checkMasterMarketing() || this.checkMasterAccountant()) {
        return true;
      }
  }
}
