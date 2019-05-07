import {Injectable} from '@angular/core';
import {OperationService} from '../operation.service';
import {EncryptionService} from '../../core/service/encryption.service';
import {PopupService} from '../../core/service/popup.service';
import {HttpClient} from '@angular/common/http';

declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class OrderService extends OperationService {

    constructor(
        public http: HttpClient,
        public encryption: EncryptionService,
        public popup: PopupService) {
        super(http, encryption, popup);

    }

    getPut(url, item: any | undefined) {
        return this.put(`order/${url}`, item);
    }

    // async search(filter: any | undefined) {
    //     return await  this.get('order', filter).toPromise();
    // }

     search(filter: any | undefined) {
        return   this.get('order', filter);
    }

    postChat(item: any | undefined) {
        console.log(item);
        return this.post(`chat`, item);
    }

    putProduct(url, item: any | undefined) {
        return this.put(`product/${url}`, item);
    }

    patchChat(url, item: any | undefined) {
        return this.patch(`chat-service/${url}`, item);
    }

    putPurchase(url, item: any | undefined) {
        return this.put('purchase/' + url, item);
    }

    /**
     * @param {any | {}} order
     * @param {any | null} scenario
     * @return {any[]}
     */
    createPostParams(order: any | {}, scenario?: any | null) {
        const params: any = {};
        params.Order = order;
        if (this.isValidValue(scenario)) {
            params.OrderScenario = scenario;
        }
        return params;
    }

    createCart(url, item: any | undefined) {
        return this.post('purchase/' + url, item);
    }
    getForPurchase(url, item: any | undefined) {
        return this.get('purchase-account' + url, item);
    }
    getListTem(filter: any | undefined) {
      return this.get('list-chat-mongo', filter);
    }

    getListCardPayment(url, item: any | undefined) {
        return this.post('card-payment', item);
    }

    putProductFee(url, item: any | undefined) {
        return this.put('fee/' + url, item);
    }

    getListWarehouse(url, item: any | undefined) {
        return this.get('warehouse', item);
    }

    removeCartPurchase(id) {
        return this.delete('purchase/delete/' + id);
    }

    postPurchaseService(url, item: any | undefined) {
        return this.post('purchase-account/' + url, item);
    }

}
