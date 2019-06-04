import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OperationService} from '../operation.service';
import {EncryptionService} from '../../core/service/encryption.service';
import {PopupService} from '../../core/service/popup.service';

@Injectable()
export class I18nService extends OperationService {

    constructor(public http: HttpClient,
                public encryption: EncryptionService,
                public popup: PopupService) {
        super(http, encryption, popup);
    }
}
