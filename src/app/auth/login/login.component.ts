import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {LoginInfo} from '../entities/login-info';
import {JwtResponse} from '../entities/jwt-response';
import {TokenStorageService} from '../../shared/services/token-storage.service';
import {ShareDataService} from '../../shared/services/share-data.service';

@Component({
  selector: 'sens-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  type: string;
  message: string;

  constructor(private tokenStorage: TokenStorageService,
              private authService: AuthService,
              private share: ShareDataService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)])
    });

    if (this.tokenStorage.getToken()) {
      this.router.navigate(['/main-page/news']);
    }
  }

  onSubmit() {
    const data = this.form.value;

    this.authService.attemptAuth(new LoginInfo(data.username, data.password)).subscribe((value: JwtResponse) => {
      console.log(value);
      this.tokenStorage.saveToken(value.accessToken);
      this.tokenStorage.saveUsername(value.username);
      this.tokenStorage.saveAuthorities(value.authorities);

      // this.share.emitUsername(this.tokenStorage.getUsername());
      this.share.setUsername(this.tokenStorage.getUsername());

      this.router.navigate(['/main-page/news']);
    }, error => {
      console.log(error);
      this.showMessage('danger', error.error.message);
    });
  }

  showMessage(type: string, message: string) {
    this.type = type;
    this.message = message;
    window.setTimeout(() => {
      this.message = '';
      this.type = '';
    }, 5000);
  }
}
