import {Injectable} from '@angular/core';
import {ClientService} from '../../core/service/client.service';
import {HttpClient} from '@angular/common/http';
import {EncryptionService} from '../../core/service/encryption.service';
import {PopupService} from '../../core/service/popup.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService extends ClientService {

  constructor(
    public http: HttpClient,
    public encryption: EncryptionService,
    public popup: PopupService) {
    super(http, encryption, popup);
  }
}
