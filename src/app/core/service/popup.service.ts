import {Injectable, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';

declare var $: any;
declare var jQuery: any;
declare var swal: any;

@Injectable({
    providedIn: 'root'
})

export class PopupService {

    constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {
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

  showSuccess() {
    this.toastr.success('You are awesome!', 'Success!');
  }

  showError() {
    this.toastr.error('This is not good!', 'Oops!');
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toastr.info('Just some information for you.');
  }

  showCustom() {
    this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
  }
}
