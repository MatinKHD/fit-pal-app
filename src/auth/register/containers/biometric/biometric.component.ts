import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Observable, takeUntil, distinctUntilChanged } from "rxjs";

import { Store } from "store";

import { AuthService } from "../../../../shared/services/auth/auth.service";

import { Unsub } from "unsub";

import { User } from "../../../../models/user";

@Component({
  selector: 'biometric',
  styleUrls: [`biometric.component.scss`],
  templateUrl: 'biometric.component.html'
})
export class BiometricComponent extends Unsub implements OnInit {
  user$: Observable<User | undefined> = this.store.select('user');

  biometricForm!: FormGroup;
  user!: User;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {
    super();
  }

  ngOnInit() {
    this.user$.subscribe(user => user ? this.user = user : null);
    this.biometricForm = this.fb.group({
      gender: [ '', Validators.required],
      age: [ '', Validators.required],
      weight: [ '', Validators.required],
      height: [ '', Validators.required],
    })
  }

  get genderRequired() {
    let control = this.control("gender")
    return control?.hasError('required') && control?.touched;
  }

  get ageRequired() {
    let control = this.control("age")
    return control?.hasError('required') && control?.touched;
  }

  get weightRequired() {
    let control = this.control("weight")
    return control?.hasError('required') && control?.touched;
  }

  get heightRequired() {
    let control = this.control("height")
    return control?.hasError('required') && control?.touched;
  }

  control(input: string) {
    return this.biometricForm.get(input)
  }

  onSubmit() {
    const body = {
      gender: this.control('gender')?.value,
      age: this.control('age')?.value,
      weight: this.control('weight')?.value,
      height: this.control('height')?.value,
    }
    this.authService.updateBiometricsOfUser(this.user, body)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.unsubscribe)
      )
      .subscribe(() => {
        localStorage.removeItem('id');
        this.router.navigate(['/auth/login']).catch(e => console.log(e));
    });
  }
}
