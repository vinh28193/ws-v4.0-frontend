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
        return this.post('tracking-code', formData);
    }
    update(id, formData) {
        return this.put('tracking-code/' + id, formData);
    }
    merge(formData) {
        return this.post('s-tracking-code', formData);
    }
    mapUnknown(id, formData) {
        return this.post('s-tracking-code/map-unknown/' + id, formData);
    }
    sellerRefund(id, formData) {
        return this.post('s-tracking-code/seller-refund/' + id, formData);
    }
    markHold(id, formData) {
        return this.post('s-tracking-code/mark-hold/' + id, formData);
    }
}
