import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    public set(key: any, value: any): any {
        localStorage.setItem(key, value);
    }

    public get(key: any): any {
        return localStorage.getItem(key);
    }

    public remove(key: any): any {
        localStorage.removeItem(key);
    }
}
