import {Injectable} from '@angular/core';
import {ApiUrlService} from './api-url.service';
import {News} from '../../../entities/news.entity';
import {Observable} from 'rxjs/index';

@Injectable()
export class ApiNewsService {

  private addition = '/news';

  constructor(private api: ApiUrlService) {
  }

  getAll(): Observable<Array<News>> {
    return this.api.get(this.addition + '/get-all');
  }

  addNews(news: News): Observable<News> {
    return this.api.post(this.addition + '/add', news);
  }

  editNews(news: News): Observable<News> {
    return this.api.put(this.addition + '/edit', news);
  }

  deleteNews(id: number) {
    return this.api.delete(this.addition, id);
  }

}
