import {Component, OnInit } from '@angular/core';

import { AuthService } from "../../../../../shared/services/auth/auth.service";

import {Observable, takeUntil } from "rxjs";

import { Unsub } from "unsub";

import { User } from "../../../../../models/user"

@Component({
  selector: 'app-landing',
  styleUrls: ['landing.component.scss'],
  providers: [ AuthService ],
  template: `
    <div class="container">
      <h4 *ngIf="!user">Welcome To <span>Fit Pal</span></h4>
      <div class="btn-container d-flex justify-content-between flex-row" *ngIf=" !user">
        <button [routerLink]="'/auth/login'">Login</button>
        <span>Or</span>
        <button [routerLink]="'/auth/register'">Sign-Up</button>
      </div>

      <h4 *ngIf="user">Fit<span>Pal</span></h4>
      <app-health-navigation *ngIf="user"></app-health-navigation>
      <pre>{{user$ | async | json}}</pre>
    </div>
  `
})
export class LandingComponent extends  Unsub implements OnInit {

  user$!: Observable<User | null>;
  user!: User | null;

  constructor() {
    super();
  }

  ngOnInit() {
    this.user$.pipe(takeUntil(this.unsubscribe)).subscribe(user => this.user = user)
  }
}
