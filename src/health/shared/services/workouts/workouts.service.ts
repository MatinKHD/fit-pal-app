import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import {Observable, tap, filter, map, of } from "rxjs";

import { Store } from "store";

import { AuthService } from "../../../../shared/services/auth/auth.service";

import { Workout } from "../../../../models/workout";

@Injectable()
export class WorkoutsService {

  api: string = "http://localhost:3000/workouts";

  workouts$: Observable<Workout[]> =  this.fetchWorkouts()
    .pipe(tap( next => this.store.set('workouts',next)));

  constructor(
    private authService: AuthService,
    private store: Store,
    private http: HttpClient
  ) {
  }

  addWorkout(body: Workout): Observable<Workout> {
    let workoutId: string | null = `_${Math.random().toString(36).substr(2,11)}`;
    let retrievedWorkouts = localStorage.getItem('workouts') as string;
    let workout = {...body, ...{id: workoutId, exists: true}}

    if (retrievedWorkouts === null)  localStorage.setItem('workouts', JSON.stringify([workout]))
    else {
      let stored: Workout[] = JSON.parse(retrievedWorkouts);
      stored.push(workout);
      localStorage.setItem('workouts', JSON.stringify(stored));
    }

    return this.http.post<Workout>(`${this.api}`, workout);
  }

  updateWorkout(body: Workout): Observable<Workout> {
    return this.http.put<Workout>(`${this.api}/${body.id}`, body)
  }

  fetchWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.api}`)
  }

  getWorkout(id: string) {
    const mocked: Workout = {id: '',name:'', endurance: '', type: '', strength: '', exist: false, timestamp: 0};

    if(!id) return  of(mocked);
    return  this.store.select<Workout[]>('workouts').
      pipe(
        filter(Boolean),
        map(workouts => workouts.find(workout => workout.id === id))
    )
  }

  removeWorkouts(workout: Workout) {
    let retrievedWorkouts = localStorage.getItem('workouts') as string;
    let stored: Workout[] = JSON.parse(retrievedWorkouts);
    let newStored = stored.filter(_workout => workout.id !== _workout.id)
    localStorage.setItem('workouts', JSON.stringify(newStored));

    return this.http.delete<Workout>(`${this.api}/${workout.id}`);
  }
}
