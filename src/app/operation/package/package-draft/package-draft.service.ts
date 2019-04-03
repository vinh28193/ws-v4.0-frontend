import {Injectable} from '@angular/core';
import {PackageService} from '../package.service';
import {HttpClient} from '@angular/common/http';
import {EncryptionService} from '../../../core/service/encryption.service';
import {PopupService} from '../../../core/service/popup.service';

@Injectable({
    providedIn: 'root'
})
export class PackageDraftService extends PackageService {

    constructor(
        public http: HttpClient,
        public encryption: EncryptionService,
        public popup: PopupService) {
        super(http, encryption, popup);
    }

    search($queryParams: any | undefined) {
        return this.get('draft-package-item', $queryParams);
    }

    handlePerPage($perPage) {

    }

    handlePagination($page) {

    }
}
