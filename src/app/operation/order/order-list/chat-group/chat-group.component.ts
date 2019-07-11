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
    public matchesList1: any = [];
    public userData: any = [];
    public lastkeydown1: any = 0;
    public subscription: any;
    public chatlists: any = [];

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
        const text_sugest = this.chatGroup.value.message;
        this.matchesList1 = [];
        //  ToDo : @Phuchc thêm text type suppoting
        // Get All Key Chat Suppoted
        this.orderService.getNoLoad(`chatlists`, 1).subscribe(res => {
            const result1: any = res;
            this.chatlists = result1.data;

            const array_list: any = [];
            for (let i = 0; i <= this.chatlists.length - 1; i++) {
              if (this.chatlists[i].active === 1) {
                array_list.push(this.chatlists[i].content + '-Type: ' + this.chatlists[i].type);
              }
            }
            this.userData = array_list;
        });
         if (text_sugest.length >= 2) {
             if ($event.timeStamp - this.lastkeydown1 >= 200) {
                // ToDo : @Phuchc thêm text type suppoting
                this.matchesList1 = this.userData.filter(v => v.indexOf(text_sugest) > -1);
                // this.matchesList1 = this.searchFromArray(this.userData, userId);
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
    }

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
        }
        if (this.code !== '') {
            params.Order_path = this.code;
        }
        if (this.status === 'NEW') {
            params.isNew = 'yes';
        }
        params._chat = 'ORDER';
        params.type_chat = 'GROUP_WS';
        params.suorce = 'BACK_END';
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
