import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClientService} from '../../../core/service/client.service';

@Injectable()
export class ShipmentService extends ClientService {

  getList(url, pararms) {
    pararms = $.param(pararms);
    return this.get(url, pararms);
  }
}
