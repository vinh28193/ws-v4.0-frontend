import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class EncryptionService {

    constructor(private storage: StorageService) {
    }

    public encrypt(key, value) {
        this.storage.set(key, value);
    }

    public decrypt(key) {
        return this.storage.get(key);
    }
}
