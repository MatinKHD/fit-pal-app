import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Observable, takeUntil, distinctUntilChanged } from "rxjs";

import { Store } from "store";

import { AuthService } from "../../../shared/services/auth/auth.service";

import { Unsub } from "unsub";

import { User } from "../../../models/user";

@Component({
  selector: 'app-user-profile',
  styleUrls: ['./user-profile.component.scss'],
  templateUrl: `./user-profile.component.html`
})
export class UserProfileComponent extends Unsub implements OnInit {

  user$: Observable<User | undefined> = this.store.select('user');

  profileForm!: FormGroup;

  error!: string;
  user!: User;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.user$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(user => {
        if (!user) return;

        this.initializeForm(user);
        this.user = user;
      })
  }

  private initializeForm(user: User) {
    let bmi = this.calculateBmi(user.weight ,user.height)
    this.profileForm = this.fb.group({
      email: [ user.email, Validators.required],
      gender: [ user.gender, Validators.required],
      age: [ user.age, Validators.required],
      weight: [ user.weight, Validators.required],
      height: [ user.height, Validators.required],
      bmi: [bmi, Validators.required],
    })
  }

  private calculateBmi(weight: number | undefined, height: number | undefined) {
    let bmi = weight && height ? weight/Math.pow(height/100,2): 0;
    return Math.round(bmi);
  }

  updateBmi() {
    let weight = this.profileForm.get('weight')?.value;
    let height = this.profileForm.get('height')?.value;
    let bmi = this.calculateBmi(weight, height);
    this.profileForm.get('bmi')?.setValue(bmi);
  }

  private getControl(controlName: string): string | number {
    return this.profileForm.get(controlName)?.value;
  }

  onSubmit() {
    const newUser = {
      gender: this.getControl('gender') as string,
      age: this.getControl('age') as number,
      weight: this.getControl('weight') as number,
      height: this.getControl('height') as number,
    }
    this.authService.updateBiometricsOfUser(this.user,newUser)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.unsubscribe)
      )
      .subscribe();
    this.router.navigate(['/'])
  }

  inputFieldRequired(controlName: string) {
    let control = this.profileForm.get(controlName);
    return control?.hasError('required') && control?.touched;
  }

}
