import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { MealsService } from "../../../shared/services/meals/meals.service";

import { Observable, takeUntil, switchMap, distinctUntilChanged } from "rxjs";

import { Unsub } from "unsub";

import { Meal } from "../../../../models/meal";


@Component({
  selector: 'app-meal',
  styles: [`
    .container {
      background: white;
      box-shadow: 0 0 16px 10px #000000b0;
      color: black;
      font-size: 16px;
      border-radius: 10px;
      overflow: hidden;

      .workouts__title {
        background: rgba(70, 70, 70, 0.16);

        h1 {
          font-size: 20px;
        }
      }
    }

  `],
  template: `
    <app-health-navigation></app-health-navigation>
    <div class="container d-flex flex-column">
      <div class="workouts__title d-flex justify-content-between align-items-center py-4 px-5">
        <h1 class="d-flex align-items-center">
          <img
            class="icon mr-2"
            src="../../../../assets/img/love.png">
          <span
            *ngIf="(meal$ | async) as meal; else loading">
            {{ meal.name ? "Edit" : "Create"}} Meal
          </span>
          <ng-template #loading>
            ...Loading
          </ng-template>
        </h1>
      </div>
      <div
        *ngIf="(meal$ | async) as meal">
        <meal-form
          [meal]=meal
          (add)="createMeal($event)"
          (update)="updateMeal($event)"
          (remove)="removeMeal($event)"
        >
        </meal-form>
      </div>

    </div>
  `
})
export class MealComponent extends Unsub implements OnInit {

  meal$!: Observable<Meal | undefined>;

  constructor(
    private mealsService: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.meal$ = this.route.params.pipe(
      switchMap(param => this.mealsService.getMeal(param['id'])),
      takeUntil(this.unsubscribe)
    )
  }

  createMeal(value: Meal) {
    this.mealsService.addMeal(value)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.unsubscribe)
        ).subscribe();
    this.navigateToMeals()
  }

  updateMeal(value: Meal) {
    this.mealsService.updateMeal(value).pipe(takeUntil(this.unsubscribe)).subscribe();
    this.navigateToMeals();

  }

  removeMeal(value: Meal) {
    this.mealsService.removeMeals(value).pipe(takeUntil(this.unsubscribe)).subscribe();
    this.navigateToMeals();
  }

  navigateToMeals() {
    this.router.navigate(['./health/meals'])
  }

}
