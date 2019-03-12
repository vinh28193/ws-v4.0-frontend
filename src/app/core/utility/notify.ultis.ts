/**
 * Created by Thaim on 5/18/2017.
 */
import {environment} from '../../../environments/environment';

declare var $: any;
declare var jQuery: any;
declare var swal: any;
declare var toastr: any;
declare var NProgress: any;
declare var CryptoJS: any;

export class NotifyUltis {
    // 'default','warning','danger','success', 'primary','secondary'
//     placement exampe
// {
//     from: "bottom",
//     align: "center"
// }
// Notify config params
// {
//     // whether to hide the notification on click
//     clickToHide: true,
//     // whether to auto-hide the notification
//     autoHide: true,
//     // if autoHide, hide after milliseconds
//     autoHideDelay: 5000,
//     // show the arrow pointing at the element
//     arrowShow: true,
//     // arrow size in pixels
//     arrowSize: 5,
//     // position defines the notification position though uses the defaults below
//     position: '...',
//     // default positions
//     elementPosition: 'bottom left',
//     globalPosition: 'top right',
//     // default style
//     style: 'bootstrap',
//     // default class (string or [string])
//     className: 'error',
//     // show animation
//     showAnimation: 'slideDown',
//     // show animation duration
//     showDuration: 400,
//     // hide animation
//     hideAnimation: 'slideUp',
//     // hide animation duration
//     hideDuration: 200,
//     // padding between element and notification
//     gap: 2
// }

    public baseUrl: any;
    public store: any = 'VN';
    public API_URL = '';
    public API_URL_BACKEND = '';
    public IMG_URL = '';
    public IMG_URL_WH = '';
    public API_WALLET = '';

    constructor() {
        this.baseUrl = window.location.origin;
        this.store = localStorage.getItem('store_domain');
        if (!this.store) {
            this.store = 'VN';
            localStorage.setItem('store_domain', this.store);
        }
        this.API_URL = environment['API_URL_' + this.store];
        this.API_URL_BACKEND = environment.API_URL_BACKEND;
        this.IMG_URL = environment['IMG_URL_' + this.store];
        this.IMG_URL_WH = environment.IMG_URL_WH;
    }

    startLoading() {
        NProgress.start();
    }

    endLoading() {
        NProgress.done();
    }

    notify(message, title, status, icon = '', url = '', config = {}) {
        $.notify({
            icon,
            title: '<strong>' + title + '</strong>',
            message,
            url
        }, {
            type: status
        }, {
            placement: config
        });
    }

    //
    // ngxClipboard [cbContent]="text1" (cbOnSuccess)="isCopied1 = true"
    // [ngxClipboard]="inputTarget"  (cbOnSuccess)="isCopied2 = true"
    notifyCopied() {
        this.notify('Success', 'Coppied to clipboard', 'success');
    }

    success(message, title) {
        toastr.success(message, title);
    }

    fail(message, title) {
        toastr.error(message, title);
    }

    popup(message, title) {
        swal({
            title,
            text: message
        });
    }

    popupHtml(title, html, fuctionAction, functionFail = null) {
        swal({
            title,
            type: 'warning',
            html,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
        }).then(() => {
            fuctionAction();
            return true;
        }, dismiss => {
            // dismiss can be 'cancel', 'overlay',
            // 'close', and 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'You cancelled action',
                    'error'
                );
                if (functionFail != null) {
                    functionFail();
                }
            }
            return false;
        });
    }

    popupSuccess(title, text) {
        swal({
            title,
            text,
            type: 'success',
            confirmButtonClass: 'btn-success',
            confirmButtonText: 'Success'
        });
    }

    popupError(title, text) {
        swal({
            title,
            text,
            type: 'error',
            confirmButtonClass: 'btn-danger'
        });
    }

    popupInput(functionAction, title) {
        swal({
            title,
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            allowOutsideClick: false
        }).then(text => {
            functionAction(text);
        });
    }

    popupWarning(fuctionAction, text = 'Your will not be able to recover this file!', functionFail = null) {
        swal({
            title: 'Are you sure?',
            text,
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Back',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then(() => {
            fuctionAction();
            return true;
        }, dismiss => {
            // dismiss can be 'cancel', 'overlay',
            // 'close', and 'timer'
            if (dismiss === 'cancel') {
                swal(
                    'Cancelled',
                    'You cancelled action',
                    'error'
                );
                if (functionFail != null) {
                    functionFail();
                }
            }

            return false;
        });
    }

    popupRemove(funcRemove, text = 'You will not be able to recover this record!', cancel = 'Cancel') {
        swal({
            title: 'Are you sure?',
            text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonClass: 'btn-danger',
            confirmButtonText: 'Yes, remove it',
            cancelButtonText: cancel,
            closeOnCancel: false
        }).then(
            isConfirm => {
                if (isConfirm) {
                    funcRemove();
                    swal({
                        title: 'Deleted!',
                        text: 'This item has been deleted.',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                } else {
                    swal({
                        title: 'Cancelled',
                        text: 'This item is safe :)',
                        type: 'error',
                        confirmButtonClass: 'btn-danger'
                    });
                }
            });
    }

    encrypt(key, value) {
        // const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(value), '23ds43546324cxbfdh#44$**');
        // localStorage.setItem(key, ciphertext);
        localStorage.setItem(key, value);
    }

    decrypt(key) {
        const ciphertext = localStorage.getItem(key);
        return ciphertext;
        // if (ciphertext == null) {
        //     return '';
        // }
        // const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), '23ds43546324cxbfdh#44$**');
        // return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    getStoreCode($store) {
        switch (Number($store)) {
            case 6:
                return 'MY';
            case 7:
                return 'ID';
            case 9:
                return 'PH';
            case 10:
                return 'TH';
            case 1:
                return 'VN';
            default:
                return '';
        }
    }

    public catchStatus(res, loading = true) {
        if (loading) {
            if (res.success) {
                // console.log();
                this.success(res.message, 'Success');
                // this.success(customMsg != "" ? customMsg : res.message, "Success");
            } else {
                this.popupError('ERROR ', res.message);
            }
            this.endLoading();
        }
    }
}
