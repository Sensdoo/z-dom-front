import { NgModule } from '@angular/core';
import {LoginComponent} from './login/login.component';
import {AuthComponent} from './auth.component';
import { RegistrationComponent } from './registration/registration.component';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../shared/shared.module';
import {AuthService} from './services/auth.service';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
