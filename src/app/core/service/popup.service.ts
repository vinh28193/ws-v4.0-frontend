import {Injectable} from '@angular/core';

declare var $: any;
declare var jQuery: any;
declare var swal: any;

@Injectable({
  providedIn: 'root'
})

export class PopupService {


  popup(type, message, title) {
    if (type === 'success') {
      this.success(message, title);
    } else if (type === 'error') {
      this.error(message, title);
    } else {
      this.error('unknown type:' + type, 'Ejected !');
    }
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

  warning(funcAction, message, funcDismiss = null) {
    swal({
      title: 'Are you sure ?',
      text: message,
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Back',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then(function () {
      funcAction();
      return true;
    }, function (dismiss) {
      // dismiss can be 'cancel', 'overlay',
      // 'close', and 'timer'
      if (dismiss === 'cancel') {
        swal(
          'Cancelled',
          'You cancelled action',
          'error'
        );
        funcDismiss = funcDismiss || null;
        if (funcDismiss !== null) {
          funcDismiss();
        }
      }
      return false;
    });
  }

  warningChat(funcAction, message, funcDismiss = null) {
    swal({
      title: 'Are you sure chat ?',
      text: message,
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Back',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then(function (response) {
      funcAction();

      return true;

    }, function (dismiss) {
      // dismiss can be 'cancel', 'overlay',
      // 'close', and 'timer'
      if (dismiss === 'cancel') {
        swal(
          'Cancelled',
          'You cancelled action',
          'error'
        );
        if (funcDismiss != null) {
          funcDismiss();
        }
      }
      return dismiss;
    });

  }

  confirm(funcAction, message, action = 'remove') {
    swal({
      title: 'Are you sure?',
      text: message,
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn-danger',
      confirmButtonText: 'Yes, ' + action + ' it',
      cancelButtonText: 'Cancel',
      closeOnCancel: false
    }).then(
      function (isConfirm) {
        if (isConfirm) {
          funcAction();
          swal({
            title: action + ' !',
            text: 'Action completed.',
            type: 'success',
            confirmButtonClass: 'btn-success'
          });
        } else {
          swal({
            title: 'Cancelled',
            text: 'Action cancel',
            type: 'error',
            confirmButtonClass: 'btn-danger'
          });
        }
      });
  }
}
