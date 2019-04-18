import {Component, OnInit} from '@angular/core';

import {BaseComponent} from '../core/base.compoment';
import {AuthService} from '../core/service/auth.service';
import {PopupService} from '../core/service/popup.service';
import {StorageService} from '../core/service/storage.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

    public username = '';
    public password = '';
    public loading: boolean = false;

    constructor(
        private authService: AuthService,
        private popup: PopupService,
        private storage: StorageService,
        private router: Router,
        private activeRouter: ActivatedRoute
    ) {
        super(authService);
    }

    ngOnInit() {
        const queryParams = this.activeRouter.snapshot.queryParams;
        if (queryParams.hasOwnProperty('r')) {
            this.authService.redirectURL = queryParams.r;
        }
        // console.log(this.authService.redirectURL);
        localStorage.clear();  // Clear Token khi set role moi
    }

    login() {
        this.loading = true;
        if (!this.username || !this.password) {
            this.loading = false;
            this.popup.error('Tài khoản hoặc mật khẩu không được để trống.', 'Lỗi');
        }
        this.authService.getAuthorize(this.username, this.password).subscribe(ret => {
            const res: any = ret;
            // console.log('res' + JSON.stringify(res));
            if (res.success) {
                this.loading = false;
                const rs: any = res.data;
                // console.log('authorizationCode : ' + rs.code);
                this.authService.authorizationCode = rs.code;
                this.authService.authorizationCodeExpire = rs.expires_at;
                // console.log('authorizationCode : ' + this.authService.authorizationCode);
                // console.log('authorizationCodeExpire : ' + this.authService.authorizationCodeExpire);
                this.selfHandleAccessToken();
            } else {
                this.loading = false;
                this.popup.error(res.message, 'Error');
            }
            this.loading = false;
            // console.log('done');
        });
    }

    selfHandleAccessToken() {
        this.authService.getAccessToken().subscribe(rt => {
            const res: any = rt;
            if (res.success) {
                this.authService.handleAccessToken(res, true);
            } else {
                this.popup.error(res.message, 'Error');
            }
        });
    }

}
