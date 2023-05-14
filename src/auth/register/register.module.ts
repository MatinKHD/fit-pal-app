import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "../../shared/shared.module";

import { RegisterComponent } from "./containers/register/register.component";
import { BiometricComponent } from "./containers/biometric/biometric.component";

const ROUTES: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'biometric', component: BiometricComponent },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    RegisterComponent,
    BiometricComponent
  ]
})
export class RegisterModule {
}
