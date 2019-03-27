import {Injectable} from '@angular/core';

declare var $: any;
declare var jQuery: any;
declare var swal: any;

@Injectable({
    providedIn: 'root'
})

export class PopupService {

    constructor() {
    }

    error(message: string, title: any = null || 'Error') {
        swal({
            title: title,
            text: message,
            type: 'error',
            confirmButtonClass: 'btn-danger'
        });
    }

    success(message: string, title: any = null || 'Success') {
        swal({
            title: title,
            text: message,
            type: 'success',
            confirmButtonClass: 'btn-success',
            confirmButtonText: 'Success'
        });
    }

    warning(){

    }
}
