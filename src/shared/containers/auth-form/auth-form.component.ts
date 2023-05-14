import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'auth-form',
  styleUrls: ['auth-form.component.scss'],
  template: `
    <div class="container">
      <ng-content select="h4"></ng-content>
      <form [formGroup]="authForm" (ngSubmit) = onSubmit()>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            class="form-control"
            id="email"
            placeholder="Enter Your Email"
            formControlName="email"
            type="email">
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input
            class="form-control"
            id="password"
            placeholder="Enter Your Password"
            formControlName="password"
            type="password">
        </div>
        <div class="">
          <ng-content select=".error"></ng-content>
        </div>
        <div class="error" *ngIf="emailFormat">Invalid email format!</div>
        <div class="error" *ngIf="passwordInvalid">Password is required!</div>
        <div class="btn-container">
            <ng-content select="button"></ng-content>
        </div>
      </form>
    </div>
  `
})
export class AuthFormComponent implements OnInit {

  authForm!: FormGroup;

  @Output()
  submitted: EventEmitter<any> = new EventEmitter

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.authForm = this.fb.group({
      email: [ '',  [Validators.required ,Validators.email ] ],
      password: [ '', Validators.required]
    });
  }

  get emailFormat() {
    const control = this.authForm.get('email');
    return control?.hasError('email') && control?.touched;
  }

  get passwordInvalid() {
    const control = this.authForm.get('password');
    return control?.hasError('required') && control?.touched;
  }

  onSubmit() {
    const email = this.authForm.get('email')?.value;
    const password = this.authForm.get('password')?.value;

    if(this.authForm.valid)  this.submitted.emit({ email, password });
  }


}

