import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

// containers
import { AuthFormComponent } from "./containers/auth-form/auth-form.component";
import { HealthNavigationComponent } from "./containers/heath-navigation/health-navigation.component";

// services

import { AuthService } from "./services/auth/auth.service";
//guards
import { AuthGuard } from "./guards/auth/auth.guard";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    AuthFormComponent,
    HealthNavigationComponent,
  ],
  exports: [
    AuthFormComponent,
    HealthNavigationComponent,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        AuthGuard
      ]
    }
  }
}
