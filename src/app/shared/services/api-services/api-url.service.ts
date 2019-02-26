import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/index';

@Injectable()
export class ApiUrlService {

  // private url = 'http://172.16.172.125:8888/api';
  private url = 'http://188.119.67.106:8888/api';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {}

  get(addition: string): Observable<any> {
    return this.http.get(this.url + addition, this.httpOptions);
  }

  post(addition: string, data: any = {}): Observable<any> {
    return this.http.post(this.url + addition, data, this.httpOptions);
  }

  put(addition: string, data: any = {}): Observable<any> {
    return this.http.put(this.url + addition, data, this.httpOptions);
  }

  delete(addition: string, id: number): Observable<any> {
    return this.http.delete(this.url + addition + '/' + id, this.httpOptions);
  }
}
