import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SystemComponent} from './system.component';
import {MainPageComponent} from './main-page/main-page.component';

const routes: Routes = [
  // todo добавить canActivate: [AppGuard]
  {
    path: '', component: SystemComponent, children: [
    {path: 'main-page', component: MainPageComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
