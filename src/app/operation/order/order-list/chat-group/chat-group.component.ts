import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {OrderDataComponent} from '../../order-data.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PopupService} from '../../../../core/service/popup.service';
import {OrderService} from '../../order.service';


declare var $: any;

@Component({
    selector: 'app-chat-group',
    templateUrl: './chat-group.component.html',
    styleUrls: ['./chat-group.component.css']
})

export class ChatGroupComponent extends OrderDataComponent implements OnInit {
    public chatGroup: FormGroup;
    @Input() code: any = 'null';
    @Input() id: any = null;
    @Input() status: any = null;
    public listChatG: any = [];
    public username: any;
    public loging: any;
    public countC = 0;
    private form: any;
    public userList1: any = [];
    public userData: any = [];
    public lastkeydown1: any = 0;
    public subscription: any;

    constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
        super(orderService);
    }

    ngOnInit() {
        this.loging = localStorage.getItem('userLogin');
        this.username = (JSON.parse(this.loging).username);
        this.buildChat();
        this.chatGroupAll();
    }

    buildChat() {
        this.chatGroup = this.fb.group({
            message: '',
        });
    }

    getUserIdsFirstWay($event) {
        const userId = this.chatGroup.value.message;
        console.log('userId ' + userId);
        this.userList1 = [];
        this.userData = ['1000', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009', '1010'];
        if (userId.length > 2) {
            // console.log('$event.timeStamp :' + $event.timeStamp);
            // console.log('this.lastkeydown1 :' + this.lastkeydown1);
            // this.userList1 = this.userData.filter(v => v.indexOf(userId) > -1);
            if ($event.timeStamp - this.lastkeydown1 > 200) {
                this.userList1 = this.searchFromArray(this.userData, userId);
            }
        }
    }

    searchFromArray(arr, regex) {
        const matches = [];
        let i;
        for (i = 0; i < arr.length; i++) {
            if (arr[i].match(regex)) {
                matches.push(arr[i]);
            }
        }
        return matches;
    };

    chatGroupAll() {
        this.orderService.get(`chat/${this.code}`, 1).subscribe(res => {
            const result1: any = res;
            this.listChatG = result1.data;
        });
    }

    createChatG() {
        const params = this.prepare();
        const messagePop = params.message;
        params.message = params.message.replace(/\n/g, '<br>');

        this.popup.warningChat(() => {
            this.orderService.postChat(params).subscribe(res => {
                this.chatGroupAll();
                this.buildChat();
            });
        }, messagePop);
    }

    prepare() {
        const value = this.chatGroup.value;
        const params: any = {};
        if (value.message !== '') {

            params.message = value.message;
            console.log(params.message.toLowerCase());
        }
        if (this.code !== '') {
            params.Order_path = this.code;
        }
        if (this.status === 'NEW') {
            params.isNew = 'yes';
        }
        params.type_chat = 'GROUP_WS';
        params.suorce = 'BACK_END';
        console.log(params);
        return params;
    }

    checkTime(time) {
        const date = new Date();
        const date1 = new Date(time);
        if (date.getDate() === date1.getDate()) {
            return true;
        }
    }

    handleKeyEvent(event) {

    }
}
