import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from "../../../shared/shared.module";

import { AuthGuard } from "../../../shared/guards/auth/auth.guard";

import { LayoutComponent } from "./containers/layout/layout.component";

import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { LandingComponent } from "./components/landing/landing.component";

const ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'landing' },
      { path: 'landing', component: LandingComponent },
      { path:'auth', loadChildren: () => import('../../../auth/auth.module').then(m => m.AuthModule) },
      { path:'health', loadChildren: () => import('../../../health/health.module').then(m => m.HealthModule) },
      { path: 'user', canActivate: [AuthGuard], loadChildren: () => import('../../../user/user.module').then(m => m.UserModule ) }
    ]
  }
]

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent
  ],
  imports:[
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot()
  ]
})
export class LayoutModule {}
