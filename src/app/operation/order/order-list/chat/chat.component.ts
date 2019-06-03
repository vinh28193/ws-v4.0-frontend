import {Component, Input, OnInit} from '@angular/core';
import {OrderDataComponent} from '../../order-data.component';
import {OrderService} from '../../order.service';
import {PopupService} from '../../../../core/service/popup.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {getDate} from 'ngx-bootstrap/chronos/utils/date-getters';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
})
export class ChatComponent extends OrderDataComponent implements OnInit {
    @Input() code: any = null;
    @Input() status: any = null;
    @Input() id: any = null;
    public matchesList1: any = [];
    public listChat: any = [];
    public userData: any = [];
    public lastkeydown1: any = 0;
    public chatGroup: FormGroup;
    public username: any;
    public loging: any;

    constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
        super(orderService);
    }

    ngOnInit() {
        this.loging = localStorage.getItem('userLogin');
        this.username = (JSON.parse(this.loging).username);
        this.buildChat();
        this.chatCustomerAll();
    }

    buildChat() {
        this.chatGroup = this.fb.group({
            message: ''
        });
    }

    chatCustomerAll() {
        this.orderService.get(`chat/${this.code}`, 1).subscribe(res => {
            const result1: any = res;
            this.listChat = result1.data;
        });
    }
    getUserIdsFirstWay($event) {
      const text_sugest = this.chatGroup.value.message;
      console.log('text_sugest :' + text_sugest);
      this.matchesList1 = [];
      //  ToDo : @Phuchc thêm text type suppoting
      // Get All Key Chat Suppoted
      this.orderService.get(`list-chat-mongo`, 1).subscribe(res => {
        const result1: any = res;
        this.listChat = result1.data;

        const array_list: any = [];
        for (let i = 0; i <= this.listChat.length - 1; i++) {
        if (this.listChat[i].active === 1) {
          array_list.push(this.listChat[i].content + '-Type: ' + this.listChat[i].type);
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

    createChat() {
      const params = this.prepare();
      const messagePop = params.message;
      params.message = params.message.replace(/\n/g, '<br>');
      this.popup.warningChat(() => {
        this.orderService.postChat(params).subscribe(res => {
          this.buildChat();
          this.chatCustomerAll();
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
        params.type_chat = 'WS_CUSTOMER';
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
}
