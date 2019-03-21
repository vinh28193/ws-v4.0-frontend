import {Component, Input, OnInit} from '@angular/core';
import {OrderDataComponent} from '../../order-data.component';
import {OrderService} from '../../order.service';
import {PopupService} from '../../../../core/service/popup.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent extends OrderDataComponent implements OnInit {
  @Input() id: any = null;
  @Input() code: any = null;
  public listChat: any = [];
  public chatGroup: FormGroup;
  constructor(private orderService: OrderService, private popup: PopupService, private fb: FormBuilder) {
    super(orderService);
  }

  ngOnInit() {
    this.chatGroup = this.fb.group({
      message: ''
    });
    this.orderService.get(`chat/${this.id}`, 1).subscribe(res => {
      const result1: any = res;
      this.listChat = result1.data;
    });
  }
  createChat() {
    const params = this.prepare();
    this.orderService.putChat(this.id, params).subscribe(res => {
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
