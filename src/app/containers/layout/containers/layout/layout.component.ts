import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";

import { Store } from "store";

import { AuthService } from "../../../../../shared/services/auth/auth.service";

import { LandingComponent } from "../../components/landing/landing.component";
import { HealthComponent } from "../../../../../health/containers/health.component";

import { User } from "../../../../../models/user";

@Component({
  selector: 'layout',
  styleUrls: ['layout.component.scss'],
  template:`
    <div class="d-flex flex-column">
      <app-header [user$]="user$"></app-header>
      <div class="wall">
        <div class="container d-flex flex-column justify-content-start align-items-center py-5">
          <router-outlet (activate)="onOutletLoaded($event)"></router-outlet>
        </div>
      </div>
      <app-footer></app-footer>
    </div>
  `
})
export class LayoutComponent implements OnInit {

  user$: Observable<User | undefined> = this.store.select<User>('user');

  constructor(
    private authService: AuthService,
    private store: Store,
  ) {
  }

  ngOnInit() {
    this.authService.auth();
  }

  onOutletLoaded(component: LandingComponent) {
    component.user$ = this.store.select<User>('user')
  }
}
