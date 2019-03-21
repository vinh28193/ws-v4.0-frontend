import {Injectable} from '@angular/core';
import {OperationService} from '../operation.service';
import {EncryptionService} from '../../core/service/encryption.service';
import {PopupService} from '../../core/service/popup.service';
import {HttpClient} from '@angular/common/http';

declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class OrderService extends OperationService {

    constructor(
        public http: HttpClient,
        public encryption: EncryptionService,
        public popup: PopupService) {
        super(http, encryption, popup);

    }
     getPut(url, item: any | undefined) {
        return this.update(`order/${url}`, item);
     }
    search(filter: any | undefined) {
      return this.get('order', filter);
    }
}
