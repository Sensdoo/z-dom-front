import {Injectable} from '@angular/core';
import {ApiUrlService} from '../../shared/services/api-services/api-url.service';
import {Observable} from 'rxjs/index';
import {HttpHeaders} from '@angular/common/http';
import {LoginInfo} from '../entities/login-info';
import {SignUpInfo} from '../entities/signup-info';
import {JwtResponse} from '../entities/jwt-response';
import {User} from '../entities/user.entity';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class AuthService {

  private additionSignin = '/auth/signin';
  private additionSignup = '/auth/signup';

  constructor(private api: ApiUrlService) {
  }

  attemptAuth(credentials: LoginInfo): Observable<JwtResponse> {
    return this.api.post(this.additionSignin, credentials);
  }

  signUp(user: User): Observable<string> {
    return this.api.post(this.additionSignup, user);
  }
}
