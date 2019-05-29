import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EncryptionService} from '../../core/service/encryption.service';
import {PopupService} from '../../core/service/popup.service';
import {OperationService} from '../operation.service';

@Injectable({
  providedIn: 'root'
})
export class MoreLogService extends OperationService {

  constructor(
    public http: HttpClient,
    public encryption: EncryptionService,
    public popup: PopupService) {
    super(http, encryption, popup);

  }
  searchMoreLog(url, filter: any | undefined) {
    return   this.get(url, filter);
  }
  getPut(url, item: any | undefined) {
    return this.put(`order/${url}`, item);
  }
  search(filter: any | undefined) {
    return   this.get('order', filter);
  }
  ListShopping(filter: any | undefined) {
    return   this.get('cart', filter);
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
