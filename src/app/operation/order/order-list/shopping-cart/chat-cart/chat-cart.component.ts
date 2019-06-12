import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OrderService} from '../../../order.service';
import {PopupService} from '../../../../../core/service/popup.service';
import {toNumber} from 'ngx-bootstrap/timepicker/timepicker.utils';
import {OrderDataComponent} from '../../../order-data.component';

@Component({
  selector: 'app-chat-cart',
  templateUrl: './chat-cart.component.html',
  styleUrls: ['./chat-cart.component.css']
})
export class ChatCartComponent extends OrderDataComponent implements OnInit {

  @Input() code: any = null;
  @Input() status: any = null;
  @Input() id: any = null;
  @Input() typeCart: any = null;
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
    this.matchesList1 = [];
    this.orderService.getNoLoad(`list-chat-mongo`, undefined).subscribe(res => {
      const result1: any = res;
      this.listChat = result1.data;
      const array_list: any = [];
      for (let i = 0; i < this.listChat.length; i++) {
        if (toNumber(this.listChat[i]['status']) === 1) {
          array_list.push(this.listChat[i].content + '-Type: ' + this.listChat[i].type);
        }
      }
      this.userData = array_list;
    });
    if (text_sugest.length >= 2) {
      if ($event.timeStamp - this.lastkeydown1 >= 200) {
        this.matchesList1 = this.userData.filter(v => v.indexOf(text_sugest));
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
    if (this.status === 'NEW' || this.status === 'SUPPORTING') {
      params.isNew = 'YES';
    }
    params.type_chat = 'WS_CUSTOMER';
    params.type = this.typeCart;
    params.suorce = 'BACK_END';
    params.id = this.id;
    params._chat = 'CART';
    params.chatCart = 'CHAT_CART';
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
