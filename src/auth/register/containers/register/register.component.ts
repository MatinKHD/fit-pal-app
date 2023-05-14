import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { takeUntil, distinctUntilChanged } from "rxjs";

import { AuthService } from '../../../../shared/services/auth/auth.service';

import { Unsub } from "unsub";

@Component({
  selector: 'register',
  styles:[`
    h4 {
      padding-bottom: 20px;
      text-align: center;
      font-family: cursive;
      color: rgba(0, 0, 0, 0.67);
    }
  `],
  template: `
    <auth-form (submitted)="registerUser($event)">
      <h4 class="p-4">Register</h4>
      <button
        class="btn btn-accent mt-4"
        type="submit">
        Register
      </button>
      <div class="error" *ngIf="error">{{ this.error }}</div>
    </auth-form>
  `
})
export class RegisterComponent extends Unsub {

  error!: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    super();
  }

  registerUser(event: any) {
    return this.authService.fetchUsers()
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.unsubscribe)
      )
      .subscribe(( user => {
        let usersEmail = user.map(user => user.email)
        if(usersEmail.includes(event.email)) {
          this.error = "this email has been used before";
          return null;
        } else {
          this.router.navigate(['/auth/register/biometric'])
          return this.authService.createUser(event).subscribe()
        }
      }))
  }
}
