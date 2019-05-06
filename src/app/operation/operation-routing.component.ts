import {Component, OnInit} from '@angular/core';
import {ModuleComponent} from '../module.component';
import {ActivatedRoute} from '@angular/router';

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'app-operation',
    templateUrl: './operation-routing.component.html',
    styleUrls: ['./operation-routing.component.css']
})

export class OperationRoutingComponent extends ModuleComponent implements OnInit {
    loging: any;
    role: any;
    user: any;

    constructor(public activatedRoute: ActivatedRoute
    ) {
        super(activatedRoute);
    }

    public statusSidebar = localStorage.getItem('status-sidebar') ? localStorage.getItem('status-sidebar') : 'show';
    public address: any;

    ngOnInit() {
        this.loging = localStorage.getItem('userLogin');
        this.role = localStorage.getItem('scope');
        this.user = (JSON.parse(this.loging).username);
    }

    closeSidebar() {
        $('.page-wrapper').removeClass('toggled');
        this.statusSidebar = 'hide';
        localStorage.setItem('status-sidebar', this.statusSidebar);
    }

    showSidebar() {
        $('.page-wrapper').addClass('toggled');
        this.statusSidebar = 'show';
        localStorage.setItem('status-sidebar', this.statusSidebar);
    }
   checkSale() {
       if (this.checkSuperAdmin() || localStorage.getItem('scope') === ('sale')) {
      return true;
    }
  }

   checkMasterSale() {
       if (this.checkSuperAdmin() || localStorage.getItem('scope') === ('master_sale')) {
      return true;
    }
  }

   checkOperatione() {
       if (this.checkSuperAdmin() || localStorage.getItem('scope') === ('operation')) {
      return true;
    }
  }

   checkMasterOperation() {
       if (this.checkSuperAdmin() || localStorage.getItem('scope') === ('master_operation')) {
      return true;
    }
  }

   checkPurchase() {
       if (this.checkSuperAdmin() || localStorage.getItem('scope') === ('purchase')) {
      return true;
    }
  }

   checkMarketingIntent() {
       if (this.checkSuperAdmin() || localStorage.getItem('scope') === ('marketing_intent')) {
      return true;
    }
  }

   checkMarketingAds() {
       if (this.checkSuperAdmin() || localStorage.getItem('scope') === ('marketing_ads')) {
      return true;
    }
  }

   checkMarketing() {
       if (this.checkSuperAdmin() || localStorage.getItem('scope') === ('marketing')) {
      return true;
    }
  }

   checkMasterMarketing() {
       if (this.checkSuperAdmin() || localStorage.getItem('scope') === ('master_marketing')) {
      return true;
    }
  }

   checkMasterAccountant() {
       if (this.checkSuperAdmin() || localStorage.getItem('scope') === ('master_accountant')) {
      return true;
    }
  }

   checkAccountant() {
       if (this.checkSuperAdmin() || localStorage.getItem('scope') === ('accountant')) {
      return true;
    }
  }


   checkWarehouse() {
       if (this.checkSuperAdmin() || localStorage.getItem('scope') === ('warehouse')) {
      return true;
    }
  }

   checkSuperAdmin() {
       if (localStorage.getItem('scope') === ('superAdmin')) {
      return true;
    }
  }

   checkTester() {
       if (this.checkSuperAdmin() || localStorage.getItem('scope') === ('tester')) {
      return true;
    }
  }
  checkLogout() {
      if (localStorage.getItem('accessToken') !== null) {
        return true;
      }
      return false;
  }
  checkLogin() {
    if (localStorage.getItem('accessToken') === null || localStorage.getItem('accessToken') === '') {
      return true;
    }
    return false;
  }
}
