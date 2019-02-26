import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../entities/user.entity';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'sens-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  type: string;
  message: string;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      'email': ['', [Validators.email]],
      'name': ['', [Validators.minLength(2), Validators.maxLength(25)]],
      'username': ['', [Validators.minLength(3), Validators.maxLength(25)]],
      'pass': ['', [Validators.minLength(6), Validators.maxLength(50)]],
      'confirmPass': [''],
      'secret': ['', [Validators.minLength(3), Validators.maxLength(10)]],
    }, {validator: [this.checkPasswords, this.checkSecretCode]});
  }

  onSubmit() {
    if (this.form.value.secret === 'code') {
      const data = this.form.value;
      const user = new User(data.email, data.username, data.name, data.pass);

      this.authService.signUp(user).subscribe(response => {
        console.log(response);
        this.showMessage('success', response['message']);
      }, error2 => {
        this.showMessage('danger', error2.error.message);
      });
    }
  }

  onCancel() {
    this.router.navigate(['/login']);
  }

  checkPasswords(form: FormGroup) {
    const pass = form.value.pass;
    const confirmPass = form.value.confirmPass;
    return pass === confirmPass ? null : {passwordsNotEqual: true};
  }

  checkSecretCode(form: FormGroup) {
    return form.value.secret === 'code' ? null : {invalidSecretCode: true};
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
