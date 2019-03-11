import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClientService} from '../../../core/service/client.service';

@Injectable()
export class OrderService {
  constructor(http: HttpClient) {
  }
}
