import { Component, OnInit, Input, Output } from '@angular/core';
import {OrderDataComponent} from '../../order-data.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PopupService} from '../../../../core/service/popup.service';
import {OrderService} from '../../order.service';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-chat-group',
  templateUrl: './chat-group.component.html',
  styleUrls: ['./chat-group.component.css']
})
export class ChatGroupComponent extends OrderDataComponent implements OnInit {
  public chatGroup: FormGroup;
  @Input() code: any = null;
  @Input() id: any = null;
  public listChatG: any = [];
  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
    super(orderService);
  }

  ngOnInit() {
    this.buildChat();
    this.chatGroupAll();
  }
  buildChat() {
    this.chatGroup = this.fb.group({
      message: '',
    });
  }

  chatGroupAll() {
    this.orderService.get(`chat/${this.code}`, 1).subscribe(res => {
      const result1: any = res;
      this.listChatG = result1.data;
    });
  }

  createChatG() {
    const params = this.prepare();
    this.orderService.postChat(params).subscribe(res => {
      this.chatGroupAll();
      this.buildChat();
    });
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
    params.type_chat = 'GROUP_WS';
    params.suorce = 'BACK_END';
    return params;
  }

}
