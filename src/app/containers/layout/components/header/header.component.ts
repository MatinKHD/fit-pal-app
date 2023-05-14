import {Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs";

import { AuthService } from "../../../../../shared/services/auth/auth.service";

import { User } from "../../../../../models/user";

@Component({
  selector: 'app-header',
  styleUrls: ['header.component.scss'],
  template: `
    <nav class="d-flex flex-row">
      <div class="home-container d-flex align-items-center ml-4">
        <a (click)="navigateToHome()">Home</a>
      </div>

      <div class="logo-container d-flex justify-content-center">
        <img src="../../../../../assets/img/main-logo.png">
      </div>

      <div class="user-container d-flex justify-content-end align-items-center mr-4">
        <a
            class="mr-4"
            *ngIf="!(user$ | async)?.authenticated"
            (click)="navigateToLoginPage()">
          Login
        </a>
        <a
            class="mr-4"
            *ngIf="(user$ | async)?.authenticated"
            (click)="navigateToUserPage()">
          {{(user$ | async)?.email }}
        </a>
        <a
            class="ml-4"
            *ngIf="(user$ | async)?.authenticated"
            (click)="logoutUser()">
          Logout
        </a>
      </div>
    </nav>
  `
})
export class HeaderComponent {
  @Input()
  user$!: Observable<User | undefined>;

  isUserLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  navigateToHome() {
    this.router.navigate(['/']).then(() => this.authService.auth())
  }

  navigateToLoginPage() {
    this.router.navigate(['/auth/login']).then( () => localStorage.removeItem("user") )
      .then();
  }

  navigateToUserPage() {
    this.router.navigate(['/user'])
  }

  logoutUser() {
    localStorage.removeItem('loggedInUser');
    this.authService.logoutUser();
    this.authService.auth();
    this.router.navigate(['/'])
  }
}
