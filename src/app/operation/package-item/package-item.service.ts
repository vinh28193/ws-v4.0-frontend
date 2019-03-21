import {Injectable} from '@angular/core';
import {OperationService} from '../operation.service';
import {PopupService} from '../../core/service/popup.service';
import {EncryptionService} from '../../core/service/encryption.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PackageItemService extends OperationService {

    constructor(
        public http: HttpClient,
        public encryption: EncryptionService,
        public popup: PopupService) {
        super(http, encryption, popup);
    }

    search(params: any | undefined) {
        return this.get('pi', params);
    }
}
