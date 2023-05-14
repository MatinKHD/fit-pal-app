import { Component, OnInit } from "@angular/core";

import { Observable, takeUntil } from "rxjs";

import { Store } from "store";

import { MealsService } from "../../../shared/services/meals/meals.service";

import { Unsub } from "unsub";

import { Meal } from "../../../../models/meal";

@Component({
  selector: 'app-meals',
  templateUrl: `./meals.component.html`,
  styleUrls: [`./meals.component.scss`]
})
export class MealsComponent extends Unsub implements OnInit {


  meals$: Observable<Meal[]> = this.store.select<Meal[]>('meals')

  constructor(
    private mealsService: MealsService,
    private store: Store,
  ) {
    super();
  }

  ngOnInit() {
    this.mealsService.meals$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe();
  }

  onRemove(event: Meal) {
    this.mealsService.removeMeals(event)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe();
    window.location.reload();
  }
}
