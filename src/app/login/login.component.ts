import {Component, OnInit} from '@angular/core';

import {BaseComponent} from '../core/base.compoment';
import {AuthService} from '../core/service/auth.service';
import {PopupService} from '../core/service/popup.service';
import {EncryptionService} from '../core/service/encryption.service';
import {StorageService} from '../core/service/storage.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {


    constructor(
        private authService: AuthService,
        private popup: PopupService,
        private storage: StorageService,
        private router: Router,
    ) {
        super(authService);
    }

    public username = '';
    public password = '';

    ngOnInit() {
    }

    login() {
        this.loading = true;
        if (!this.username || !this.password) {
            this.loading = false;
            this.popup.error('Tài khoản hoặc mật khẩu không được để trống.', 'Lỗi');
        }
        this.authService.getAuthorize(this.username, this.password).subscribe(ret => {
            const res: any = ret;
            /*console.log('res' + JSON.stringify(res)); */

            if (res.success) {
                this.loading = false;
                const rs: any = res.data;
                console.log('authorizationCode : ' + rs.code);
                this.authService.authorizationCode = rs.code;
                this.authService.authorizationCodeExpire = rs.expires_at;
                console.log('authorizationCode : ' + this.authService.authorizationCode);
                console.log('authorizationCodeExpire : ' + this.authService.authorizationCodeExpire);
                this.selfHandleAccessToken();
            } else {
                this.loading = false;
                this.popup.error(res.message, 'Error');
            }
            this.loading = false;
            console.log('done');

        });
    }

    selfHandleAccessToken() {
        this.authService.getAccessToken().subscribe(rt => {
            const res: any = rt;
            if (res.success) {
                const rs: any = res.data;
                const accessToken = rs.accessToken;
                const userPublicIdentity = rs.userPublicIdentity;
                console.log('res AcessToken : ' + JSON.stringify(res));
                this.authService.accessToken = accessToken.token;
                this.authService.accessTokenExpire = accessToken.expires_at;
                console.log('access token : ' + this.authService.accessToken);
                this.identity = userPublicIdentity;
                this.scope = userPublicIdentity.role;
                // this.store = rs.user.store_id;
                console.log('res Roles : ' + JSON.stringify(userPublicIdentity));
                console.log('res scope : ' + JSON.stringify(this.scope));
                switch (this.scope) {
                    case 'cms':
                        setTimeout(() => {
                            // location.reload();
                            window.location.href = '/cms';
                        }, 200);
                        break;
                    case 'warehouse':
                        setTimeout(() => {
                            // location.reload();
                            window.location.href = '/warehouse';
                        }, 200);
                        break;
                    case 'operation':
                    case 'sale':
                    case 'master_sale':
                    case 'master_operation':
                    case 'superAdmin' :
                        setTimeout(() => {
                            // location.reload();
                            window.location.href = '/operation/order';
                        }, 200);
                        break;
                    default :
                        setTimeout(() => {
                            // location.reload();
                            window.location.href = '/dashboard';
                        }, 200);
                }

            } else {
                this.popup.error(res.message, 'Error');
            }
        });
    }

}
