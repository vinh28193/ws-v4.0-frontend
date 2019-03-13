import {Injectable} from '@angular/core';
import {ClientService} from '../core/service/client.service';
import {EncryptionService} from '../core/service/encryption.service';
import {PopupService} from '../core/service/popup.service';

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
    //     return this.get('package/index', filter);
    // }
}
