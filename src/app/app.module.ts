import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

//feature modules
import {LayoutModule} from "./containers/layout/layout.module";

// containers

import { AppComponent } from './app.component';

// components
import { Store } from "store"


// routes
const Routes: Routes = [
  { path: '', loadChildren: () => import('./containers/layout/layout.module').then(m => m.LayoutModule) }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routes),
    LayoutModule
  ],
  providers: [
    Store,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
