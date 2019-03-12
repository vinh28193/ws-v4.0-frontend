import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class EncryptionService {

    constructor(private storage: StorageService) {
    }

    public encrypt(key: string, value: any | null) {
        this.storage.set(key, value);
    }

    public decrypt(key: string) {
        return this.storage.get(key);
    }
}
