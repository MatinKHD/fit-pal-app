import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from '../../../../shared/services/auth/auth.service';

@Component({
  selector: 'login',
  styles:[`
    h4 {
      text-align: center;
      font-family: cursive;
      color: rgba(0, 0, 0, 0.67);
    }
  `],
  template: `
    <auth-form (submitted)="login($event)">
      <h4 class="pb-4">Login</h4>
      <button
        class="btn btn-accent"
        type="submit">Login</button>
      <div class="error" *ngIf="error">{{error}}</div>
    </auth-form>
  `
})
export class LoginComponent implements OnInit{

  error!: string;

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
  }

  login(event:{email: string, password: string}) {
    this.authService.loginUser(event)
      .then( () => {
        if(localStorage.getItem('loggedInUser')){
          this.authService.auth();
          return this.router.navigate(['/'])
        }
         return;
      })
  }


}
