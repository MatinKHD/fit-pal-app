import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

//modules
import { SharedModule } from '../shared/shared.module';

// containers
import {AuthComponent} from "./containers/auth/auth.component";

const ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule ) },
      { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule ) },
    ]
  }
]

@NgModule({
  imports:[
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot()
  ],
  declarations:[
    AuthComponent
  ],
  providers:[]
})
export class AuthModule {}
