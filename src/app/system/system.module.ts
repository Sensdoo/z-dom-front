import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SystemComponent} from './system.component';
import {SystemRoutingModule} from './system-routing.module';
import {MainPageModule} from './main-page/main-page.module';

@NgModule({
  imports: [
    CommonModule,
    SystemRoutingModule,
    MainPageModule
  ],
  declarations: [
    SystemComponent
  ]
})
export class SystemModule { }
