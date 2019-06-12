import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EncryptionService} from '../../core/service/encryption.service';
import {PopupService} from '../../core/service/popup.service';
import {OperationService} from '../operation.service';

@Injectable({
  providedIn: 'root'
})
export class MoreLogService extends OperationService {

    constructor(
        public http: HttpClient,
        public encryption: EncryptionService,
        public popup: PopupService) {
        super(http, encryption, popup);

    }

  getPut(url, item: any | undefined) {
    return this.put(`order/${url}`, item);
  }
  searchMoreLog(url, filter: any | undefined) {
    return   this.get(url, filter);
  }
  search(filter: any | undefined) {
    return   this.get('order', filter);
  }

}
