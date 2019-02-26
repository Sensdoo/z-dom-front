import {Injectable} from '@angular/core';
import {ApiUrlService} from './api-url.service';
import {Observable} from 'rxjs/index';
import {Address} from '../../../entities/address.entity';

@Injectable()
export class ApiAddressService {

  addition = '/address';

  constructor(private api: ApiUrlService) {
  }

  getByStreetId(streetId: number): Observable<Array<Address>> {
    return this.api.get(this.addition + `/${streetId}`);
  }

  getAll() {
    return this.api.get(this.addition + '/get-all');
  }
}
