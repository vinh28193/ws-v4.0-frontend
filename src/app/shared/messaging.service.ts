import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireMessaging} from '@angular/fire/messaging';
import {mergeMapTo} from 'rxjs/operators';
import {take} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {NotificationsService} from '../core/service/notifications.service';
import {StorageService} from '../core/service/storage.service';

// custom-typings.d
declare let ClientJS: any;
// use in a .ts file
import 'clientjs';

const client = new ClientJS();

@Injectable()
export class MessagingService {

    currentMessage = new BehaviorSubject(null);
    private currentToken: any;

    constructor(
        private angularFireDB: AngularFireDatabase,
        private angularFireAuth: AngularFireAuth,
        public  notifi: NotificationsService,
        public storegate: StorageService,
        private angularFireMessaging: AngularFireMessaging) {
        this.angularFireMessaging.messaging.subscribe(
            (_messaging) => {
                _messaging.onMessage = _messaging.onMessage.bind(_messaging);
                _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
            }
        );
        this.angularFireMessaging.requestToken.subscribe(
            (token) => {
                this.currentToken = token;
                console.log('Token FCM constructor : ' + this.currentToken);
            },
            (err) => {
                console.error('constructor get token err .', err);
            }
        );
    }

    /**
     * update token in firebase database
     *
     * @param userId userId as a key
     * @param token token as a value
     */
    updateToken(userId, token) {
        // we can change this function to request our backend service
        this.angularFireAuth.authState.pipe(take(1)).subscribe(
            () => {
                const data = {};
                data[userId] = token;
                this.angularFireDB.object('fcmTokens/').update(data);
            });
    }

    /**
     * request permission for notification from firebase cloud messaging
     *
     * @param userId userId
     */
    requestPermission(userId) {
        this.angularFireMessaging.requestToken.subscribe(
            (token) => {
                this.currentToken = token;
                console.log('Token FCM : ' + this.currentToken);
                this.updateToken(userId, token);
            },
            (err) => {
                console.error('Unable to get permission to notify.', err);
            }
        );
    }

    /**
     * hook method when new notification received in foreground
     */
    receiveMessage() {
        this.angularFireMessaging.messages.subscribe(
            (payload) => {
                console.log('new message received. ', payload);
                this.currentMessage.next(payload);
            });
    }

    sendSubscriptionToServer(token, fingerprint, details, userId) {
        console.log('sendSubscriptionToServer : ' + JSON.stringify(token));
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('token', token);
        formData.append('fingerprint', fingerprint);
        formData.append('details', JSON.stringify(details));
        this.notifi.post(`notifications`, formData).subscribe(ret => {
            const res: any = ret;
            console.log('res send token Subscription ' + JSON.stringify(res));
            if (res.success) {
                const rs: any = res.data;
                console.log('Notifi data : ' + JSON.stringify(rs));
                return rs;
            } else {
                return false;
            }
            console.log('done');
        });
    }

    getUser() {
        const userLogin = this.storegate.get('userLogin');
        const dataUserLoginParse = JSON.parse(userLogin);
        const userId = dataUserLoginParse.username + '_' + dataUserLoginParse.id  ;
        return userId;
    }

    sendSubscription() {
        /**Notification**/
        const fingerprint = this.UUID();
        const details = this.UUID_Details();
        const userId = this.getUser();
        const currentToken = this.currentToken;
        console.log("currentToken : " + JSON.stringify(currentToken));
        this.sendSubscriptionToServer(currentToken, fingerprint, details, userId);
    }


    UUID() {
        const ua = client.getBrowserData().ua;
        const canvasPrint = client.getCanvasPrint();
        /** UUID Device **/
        const fingerprint = client.getCustomFingerprint(ua, canvasPrint);
        console.log(' UUID devide : ' + JSON.stringify(fingerprint));
        return fingerprint;
    }
    UUID_Details(){
        const details = {
            browser: client.getBrowser(),
            os: client.getOS(),
            osVersion: client.getOSVersion(),
            device: client.getDevice(),
            deviceType: client.getDeviceType(),
            deviceVendor: client.getDeviceVendor(),
            cpu: client.getCPU()
        };
        return details;
    }



}
