import {Component, Input, OnInit} from '@angular/core';
import {OrderDataComponent} from '../../order-data.component';
import {OrderService} from '../../order.service';
import {PopupService} from '../../../../core/service/popup.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
})
export class ChatComponent extends OrderDataComponent implements OnInit {
    @Input() code: any = null;
    @Input() status: any = null;
    @Input() id: any = null;
    public listChat: any = [];
    public chatGroup: FormGroup;

    constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
        super(orderService);
    }

    ngOnInit() {
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

    createChat() {
      const params = this.prepare();
      const messagePop = params.message;
      this.popup.warningChat(() => {
        const put = this.orderService.createPostParams({
          current_status: 'CANCEL',
        }, 'updateStatus');
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
        console.log('current:' + this.status);
        if (this.status === 'NEW') {
            params.isNew = 'yes';
        }
        params.type_chat = 'WS_CUSTOMER';
        params.suorce = 'BACK_END';
        return params;
    }
}
