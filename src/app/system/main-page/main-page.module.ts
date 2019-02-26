import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page.component';
import {SharedModule} from '../../shared/shared.module';
import {CommonModule} from '@angular/common';
import {SearchFormComponent} from './search-form/search-form.component';
import {MainPageRoutingModule} from './main-page-routing.module';
import {ApiStreetService} from '../../shared/services/api-services/api-street.service';
import {ApiAddressService} from '../../shared/services/api-services/api-address.service';
import {AddressPageComponent} from './address-page/address-page.component';
import {ApiEntranceService} from '../../shared/services/api-services/api-entrance.service';
import {DescriptionComponent} from './address-page/description/description.component';
import {NewsComponent} from './news/news.component';
import {ApiNewsService} from '../../shared/services/api-services/api-news.service';
import {StreetListPageComponent} from './street-list-page/street-list-page.component';

@NgModule({
  declarations: [
    MainPageComponent,
    SearchFormComponent,
    AddressPageComponent,
    DescriptionComponent,
    NewsComponent,
    StreetListPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainPageRoutingModule
  ],
  providers: [
    ApiStreetService,
    ApiAddressService,
    ApiEntranceService,
    ApiNewsService
  ]
})
export class MainPageModule {}
