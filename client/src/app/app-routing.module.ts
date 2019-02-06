import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterPageComponent} from "./register-page/register-page.component";

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {
        path: 'login', component: LoginPageComponent
      },
      {
        path: 'register', component: RegisterPageComponent
      }
    ]
  },
  {
    path: '', component: SiteLayoutComponent, children: [

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}