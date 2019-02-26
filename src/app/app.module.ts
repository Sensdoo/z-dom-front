import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthModule} from './auth/auth.module';
import {SystemModule} from './system/system.module';
import {AppRoutingModule} from './app-routing.module';
import {httpInterceptorProviders} from './shared/services/auth-interceptor';
import {ApiUrlService} from './shared/services/api-services/api-url.service';
import {TokenStorageService} from './shared/services/token-storage.service';
import {LocalDataStorageService} from './shared/services/local-data-storage.service';
import {HeaderComponent} from './header/header.component';
import {ShareDataService} from './shared/services/share-data.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    SystemModule,
    AppRoutingModule
  ],
  providers: [
    ApiUrlService,
    TokenStorageService,
    LocalDataStorageService,
    ShareDataService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
