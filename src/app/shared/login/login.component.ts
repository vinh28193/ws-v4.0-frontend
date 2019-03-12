import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../core/base.compoment';
import {AuthService} from '../../core/service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

    constructor(private authService: AuthService) {
        super();
    }

    public username = '';
    public password = '';

    ngOnInit() {
    }

    login() {
        if (!this.username || !this.password) {
            this.popupError('Lỗi', 'Tài khoản hoặc mật khẩu không được để trống.');
        }
        const codeAuth = this.decrypt('access_token');
        this.accessToken(codeAuth);
        if (!codeAuth) {
            this.authService.login(this.username, this.password).subscribe(ret => {
                console.log(ret);
                const res: any = ret;
                if (res.success) {
                    const rs: any = res.data;
                    this.encrypt('authorization_code', rs.authorization_code);
                    this.encrypt('authorization_code_expires_at', rs.expires_at);
                    rs.user.password_hash = this.password;
                    this.encrypt('loginUser', rs.user);
                    this.encrypt('scope', rs.user.scopes);
                    localStorage.setItem('store_domain', this.getStoreCode(rs.user.store_id));
                    console.log('authorization_code : ' + rs.authorization_code);
                    this.accessToken(rs.authorization_code);
                    console.log('authorization_code : ' + this.decrypt('access_token'));
                    this.store = this.getStoreCode(rs.user.store_id);
                    const scope = rs.user.scopes.split(',');
                    switch (scope[0]) {
                        case 'cms':
                            setTimeout(() => {
                                // location.reload();
                                window.location.href = '/#/cms';
                            }, 200);
                            break;
                        case 'warehouse':
                            setTimeout(() => {
                                // location.reload();
                                window.location.href = '/#/warehouse';
                            }, 200);
                            break;
                        case 'operation':
                        case 'sale':
                        case 'master_sale':
                        case 'master_operation':
                            setTimeout(() => {
                                // location.reload();
                                window.location.href = '/#/order';
                            }, 200);
                            break;
                        default :
                            setTimeout(() => {
                                // location.reload();
                                window.location.href = '/#/dashboard';
                            }, 200);

                    }
                } else {
                    this.popupError('Error', res.message);
                }
                console.log('done');
            });
        }
    }

    accessToken(authorizationCode) {
        this.authService.getAccessToken(authorizationCode).subscribe(rt => {
            console.log(rt);
            const res: any = rt;
            console.log('get asset');
            if (res.success) {
                const rs: any = res.data;
                this.encrypt('access_token', rs.access_token);
                this.encrypt('access_token_expires_at', rs.expires_at);
            } else {
                this.popupError('Error', res.message);
            }
        });
    }
}
