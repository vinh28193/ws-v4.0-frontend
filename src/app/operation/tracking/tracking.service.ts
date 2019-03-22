import {Injectable} from '@angular/core';
import {OperationService} from '../operation.service';
import {HttpClient} from '@angular/common/http';
import {PopupService} from '../../core/service/popup.service';
import {EncryptionService} from '../../core/service/encryption.service';

@Injectable({
    providedIn: 'root'
})
export class TrackingService extends OperationService {

    constructor(
        public http: HttpClient,
        public encryption: EncryptionService,
        public popup: PopupService) {
        super(http, encryption, popup);
    }

    search(params) {
        return this.get('tracking-code', params);
    }

    create(formData) {
        return this.request('POST', 'tracking-code', formData);
    }
}
