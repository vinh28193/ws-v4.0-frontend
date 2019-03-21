import { Component, OnInit, Input } from '@angular/core';
import {OrderDataComponent} from '../../order-data.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PopupService} from '../../../../core/service/popup.service';
import {OrderService} from '../../order.service';

@Component({
  selector: 'app-chat-group',
  templateUrl: './chat-group.component.html',
  styleUrls: ['./chat-group.component.css']
})
export class ChatGroupComponent extends OrderDataComponent implements OnInit {
  public chatGroup: FormGroup;
  public listChat: any = [];
  @Input() id: any = null;
  @Input() code: any = null;
  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
    super(orderService);
  }

  ngOnInit() {
    this.chatGroup = this.fb.group({
      message: '',
    });
    this.orderService.get(`chat/${this.id}`, 1).subscribe(res => {
      const result1: any = res;
      this.listChat = result1.data;
    });
  }

  createChatG() {
    const params = this.prepare();
    this.orderService.patchChat(this.id, params).subscribe(res => {
    });
  }
  prepare() {
    const value = this.chatGroup.value;
    const params: any = {};
    if (value.message !== '') {
      params.message = value.message;
    }
    return params;
  }

}
