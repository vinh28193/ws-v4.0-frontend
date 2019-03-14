import {Injectable} from '@angular/core';
import {ClientService} from '../core/service/client.service';
import {EncryptionService} from '../core/service/encryption.service';
import {PopupService} from '../core/service/popup.service';
import {HttpClient} from '@angular/common/http';

import {RESPONSE} from './mock-package';

@Injectable({
    providedIn: 'root'
})
export class PackageService extends ClientService {

    constructor(
        public http: HttpClient,
        public encryption: EncryptionService,
        public popup: PopupService) {
        super(http, encryption, popup);

    }

    getAllList(filter: any | undefined) {
        return this.get('package', filter);
    }
}
