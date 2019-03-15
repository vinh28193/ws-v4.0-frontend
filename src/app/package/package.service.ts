import {Injectable} from '@angular/core';
import {ClientService} from '../core/service/client.service';
import {EncryptionService} from '../core/service/encryption.service';
import {PopupService} from '../core/service/popup.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PackageService extends ClientService {
    // constructor(
    //             public encryption: EncryptionService,
    //             public popup: PopupService) {
    //     super(encryption);
    //
    // }
    // getAllList(filter: any | undefined) {
    //     return this.get('detail-package/index', filter);
    // }
    constructor(
        public http: HttpClient,
        public encryption: EncryptionService,
        public popup: PopupService) {
        super(http, encryption, popup);

    }

    getAllList(filter: any | undefined) {
        return this.get('p', filter);
    }

}
