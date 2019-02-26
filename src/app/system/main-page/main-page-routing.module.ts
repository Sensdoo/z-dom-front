import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainPageComponent} from './main-page.component';
import {AddressPageComponent} from './address-page/address-page.component';
import {NewsComponent} from './news/news.component';
import {StreetListPageComponent} from './street-list-page/street-list-page.component';

const routes: Routes = [
  // todo добавить canActivate: [AppGuard]
  { path: 'main-page', component: MainPageComponent, children: [
    {path: 'news', component: NewsComponent},
    {path: 'address-page/:addressId', component: AddressPageComponent},
    {path: 'street-list-page/:streetId', component: StreetListPageComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule {}
