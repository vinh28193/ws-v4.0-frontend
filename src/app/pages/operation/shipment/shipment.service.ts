import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClientService} from '../../../core/service/client.service';
import {EncryptionService} from '../../../core/service/encryption.service';
import {PopupService} from '../../../core/service/popup.service';

@Injectable()
export class ShipmentService extends ClientService {
  constructor(public http: HttpClient, public encryption: EncryptionService, public popup: PopupService) {
    super(http, encryption, popup);
  }
  getList(url, pararms) {
    pararms = $.param(pararms);
    return this.get(url, pararms);
  }
}
