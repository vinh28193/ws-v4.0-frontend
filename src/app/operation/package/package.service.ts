import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EncryptionService} from '../../core/service/encryption.service';
import {PopupService} from '../../core/service/popup.service';
import {OperationService} from '../operation.service';

@Injectable({
    providedIn: 'root'
})
export class PackageService extends OperationService {

    constructor(
        public http: HttpClient,
        public encryption: EncryptionService,
        public popup: PopupService) {
        super(http, encryption, popup);

    }

    search(params) {
        return this.get('tracking-code', params);
    }
    searchUsSending(params) {
        return this.get('us-sending', params);
    }
    create(formData) {
        return this.post('tracking-code', formData);
    }
    update(id, formData) {
        return this.put('tracking-code/' + id, formData);
    }
    reGetType(id, formData) {
        return this.put('s-us-send/' + id, formData);
    }
    merge(formData) {
        return this.post('s-tracking-code', formData);
    }
    mapUnknown(id, formData) {
        return this.post('s-tracking-code/map-unknown/' + id, formData);
    }
    mapUnknownUS(id, formData) {
        return this.post('s-us-send/map-unknown/' + id, formData);
    }
    sellerRefund(id, formData) {
        return this.post('s-tracking-code/seller-refund/' + id, formData);
    }
    sellerRefundUsSending(id, formData) {
        return this.post('s-us-send/seller-refund/' + id, formData);
    }
    markHold(id, formData) {
        return this.post('s-tracking-code/mark-hold/' + id, formData);
    }

}
