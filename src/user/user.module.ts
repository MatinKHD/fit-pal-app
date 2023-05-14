import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common"
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "../shared/shared.module";

import { UserProfileComponent } from "./containers/user-profile/user-profile.component";

import { ChecksForRequiredErrorDirective } from "./directives/checks-for-required-error.directive";
import { DisableInputDirective } from "./directives/disable-input.directive";

const ROUTES: Routes = [
  { path: '', component: UserProfileComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserProfileComponent,
    ChecksForRequiredErrorDirective,
    DisableInputDirective
  ]
})
export class UserModule {}
