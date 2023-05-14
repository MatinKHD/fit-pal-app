import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from "@angular/router";

import { SharedModule } from "../../shared/shared.module";

import { LoginComponent } from "./containers/login/login.component";

const ROUTES: Routes = [
  { path:'', component: LoginComponent }
]

@NgModule({
  imports:[
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {}
