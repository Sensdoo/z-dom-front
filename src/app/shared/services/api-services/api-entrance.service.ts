import {Injectable} from '@angular/core';
import {ApiUrlService} from './api-url.service';
import {Observable} from 'rxjs/index';
import {Entrance} from '../../../entities/entrance.entity';

@Injectable()
export class ApiEntranceService {

  private addition = '/entrance';

  constructor(private api: ApiUrlService) {
  }

  getByAddressId(addressId: number): Observable<Array<Entrance>> {
    return this.api.get(this.addition + `/${addressId}`);
  }

  addEntrance(entrance: Entrance): Observable<Entrance> {
    return this.api.post(this.addition + '/add', entrance);
  }

  editEntrance(entrance: Entrance): Observable<Entrance> {
    return this.api.put(this.addition + '/edit', entrance);
  }

  deleteEntrance(id: number) {
    return this.api.delete(this.addition, id);
  }

  getAll() {
    return this.api.get(this.addition + '/get-all');
  }
}
