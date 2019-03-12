import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClientService} from '../../../core/service/client.service';

@Injectable()
export class OrderService extends ClientService {
<<<<<<< HEAD
  constructor(http: HttpClient) {
    super(http);
  }
=======
    constructor(http: HttpClient) {
        super(http);
    }
>>>>>>> e179d86106ddf04d6e4a406e3b8a1452db319bd9
}
