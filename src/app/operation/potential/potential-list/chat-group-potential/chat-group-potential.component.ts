import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OrderService} from '../../../order/order.service';
import {PopupService} from '../../../../core/service/popup.service';
import {OrderDataComponent} from '../../../order/order-data.component';
import {PotentialService} from '../../potential.service';

@Component({
  selector: 'app-chat-group-potential',
  templateUrl: './chat-group-potential.component.html',
  styleUrls: ['./chat-group-potential.component.css']
})
export class ChatGroupPotentialComponent extends OrderDataComponent implements OnInit {

  public chatGroup: FormGroup;
  @Input() code: any = null;
  @Input() id: any = null;
  @Input() status: any = null;
  @Input() typeCart: any = null;
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

  constructor(public orderService: PotentialService, private popup: PopupService, private fb: FormBuilder) {
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
      console.log('array_list: ' + JSON.stringify(array_list));
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
    if (this.status === 'NEW' || this.status === 'SUPPORTING') {
      params.isNew = 'YES';
    }
    params.type_chat = 'GROUP_WS';
    params._chat = 'CART';
    params.id = this.id;
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
