import {Injectable} from '@angular/core';
import {TrackingService} from '../tracking.service';
import {HttpClient} from '@angular/common/http';
import {EncryptionService} from '../../../core/service/encryption.service';
import {PopupService} from '../../../core/service/popup.service';

@Injectable({
    providedIn: 'root'
})
export class TrackingExtensionService extends TrackingService {

    constructor(
        public http: HttpClient,
        public encryption: EncryptionService,
        public popup: PopupService) {
        super(http, encryption, popup);
    }
}
