import {Injectable} from '@angular/core';
import {PopupService} from '../../../core/service/popup.service';
import {EncryptionService} from '../../../core/service/encryption.service';
import {HttpClient} from '@angular/common/http';
import {PackageService} from '../package.service';

@Injectable({
    providedIn: 'root'
})
export class PackageItemService extends PackageService {

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
