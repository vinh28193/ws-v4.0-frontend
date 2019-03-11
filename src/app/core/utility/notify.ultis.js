"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NotifyUltis = (function () {
    function NotifyUltis() {
        this.baseUrl = window.location.origin;
    }
    NotifyUltis.prototype.startLoading = function () {
        NProgress.start();
    };
    NotifyUltis.prototype.endLoading = function () {
        NProgress.done();
    };
    NotifyUltis.prototype.notify = function (message, title, status, icon, url, config) {
        if (icon === void 0) { icon = ""; }
        if (url === void 0) { url = ""; }
        if (config === void 0) { config = {}; }
        $.notify({
            icon: icon,
            title: '<strong>' + title + '</strong>',
            message: message,
            url: url
        }, {
            type: status
        }, {
            placement: config
        });
    };
    //
    // ngxClipboard [cbContent]="text1" (cbOnSuccess)="isCopied1 = true"
    // [ngxClipboard]="inputTarget"  (cbOnSuccess)="isCopied2 = true"
    NotifyUltis.prototype.notifyCopied = function () {
        this.notify("Success", "Coppied to clipboard", 'success');
    };
    NotifyUltis.prototype.success = function (message, title) {
        $.notify({
            title: '<strong>' + title + '</strong>',
            message: message
        }, {
            type: 'success'
        });
    };
    NotifyUltis.prototype.fail = function (message, title) {
        $.notify({
            title: '<strong>' + title + '</strong>',
            message: message
        }, {
            type: 'danger'
        });
    };
    NotifyUltis.prototype.popup = function (message, title) {
        swal({
            title: title,
            text: message
        });
    };
    NotifyUltis.prototype.popupSuccess = function (title, text) {
        swal({
            title: title,
            text: text,
            type: "success",
            confirmButtonClass: "btn-success",
            confirmButtonText: "Success"
        });
    };
    NotifyUltis.prototype.popupWarning = function (fuctionAction, text) {
        if (text === void 0) { text = "Your will not be able to recover this file!"; }
        swal({
            title: "Are you sure?",
            text: text,
            type: "warning",
            showCancelButton: true,
            cancelButtonClass: "btn-default",
            confirmButtonClass: "btn-warning",
            confirmButtonText: "Ok",
            closeOnConfirm: false
        }, function () {
            fuctionAction();
            swal({
                title: "Complted!",
                text: "Action Completed",
                type: "success",
                confirmButtonClass: "btn-success"
            });
        });
    };
    NotifyUltis.prototype.popupRemove = function (funcRemove, text, cancel) {
        if (text === void 0) { text = "You will not be able to recover this record!"; }
        if (cancel === void 0) { cancel = "Cancel"; }
        swal({
            title: "Are you sure?",
            text: text,
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, remove it",
            cancelButtonText: cancel,
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                funcRemove();
                swal({
                    title: "Deleted!",
                    text: "Your imaginary file has been deleted.",
                    type: "success",
                    confirmButtonClass: "btn-success"
                });
            }
            else {
                swal({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    type: "error",
                    confirmButtonClass: "btn-danger"
                });
            }
        });
    };
    return NotifyUltis;
}());
exports.NotifyUltis = NotifyUltis;
