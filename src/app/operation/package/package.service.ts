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

    getAllList(filter: any | undefined) {
        return this.get('p', filter);
    }

}
