import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {Street} from '../../../entities/street.entity';
import {ApiUrlService} from './api-url.service';

@Injectable()
export class ApiStreetService {

  private addition = '/street';

  constructor(private api: ApiUrlService) {
  }

  getById(id: number): Observable<Street> {
    return this.api.get(this.addition + '/' + id);
  }

  getAll(): Observable<Street[]> {
    return this.api.get(this.addition + '/get-all');
  }


}
