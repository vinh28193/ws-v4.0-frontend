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

    getLanguages() {
        let languages = JSON.parse(localStorage.getItem('languages'));
        if (!languages) {
            this.http.get('i18n/get-lang').subscribe(res => {
                const result: any = res;
                if (result.success) {
                    languages = result.data;
                } else {
                    this.popup.error('Can not connect to server', 'Erorr');
                }
                localStorage.setItem('languages', JSON.stringify(languages));
            });
        }
        return languages;
    }
}
