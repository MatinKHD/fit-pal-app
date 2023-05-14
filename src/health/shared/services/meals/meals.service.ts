import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import {Observable, tap, filter, map, of } from "rxjs";

import { Store } from "store";

import { AuthService } from "../../../../shared/services/auth/auth.service";

import { Meal } from "../../../../models/meal";

@Injectable()
export class MealsService {

  api: string = "http://localhost:3000/meals";

  meals$: Observable<Meal[]> =  this.fetchMeals()
    .pipe(tap( next => this.store.set('meals',next)));

  constructor(
    private authService: AuthService,
    private store: Store,
    private http: HttpClient
  ) {
  }

  addMeal(body: Meal): Observable<Meal> {
    let mealId: string | null = `_${Math.random().toString(36).substr(2,9)}`;
    let retrievedMeals = localStorage.getItem('meals') as string;
    let meal = {...body, ...{id: mealId, exists: true}}

    if (retrievedMeals === null)  localStorage.setItem('meals', JSON.stringify([meal]))
    else {
      let stored: Meal[] = JSON.parse(retrievedMeals);
      stored.push(meal);
      localStorage.setItem('meals', JSON.stringify(stored));
    }

    return this.http.post<Meal>(`${this.api}`, meal);
  }

  updateMeal(body: Meal): Observable<Meal> {
    return this.http.put<Meal>(`${this.api}/${body.id}`, body)
  }

  fetchMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(`${this.api}`)
  }

  getMeal(id: string) {
    const mocked: Meal= {id: '',name:'', ingredients: [], exist: false, timeStamp: 0};

    if(!id) return  of(mocked);
    return  this.store.select<Meal[]>('meals').
      pipe(
        filter(Boolean),
        map(meals => meals.find(meal => meal.id === id))
    )
  }

  removeMeals(meal: Meal) {
    let retrievedMeals = localStorage.getItem('meals') as string;
    let stored: Meal[] = JSON.parse(retrievedMeals);
    let newStored = stored.filter(_meal => meal.id !== _meal.id)
    localStorage.setItem('meals', JSON.stringify(newStored));

    return this.http.delete<Meal>(`${this.api}/${meal.id}`);
  }
}
