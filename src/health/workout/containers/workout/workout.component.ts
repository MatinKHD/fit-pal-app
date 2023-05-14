import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { WorkoutsService } from "../../../shared/services/workouts/workouts.service";

import { Observable, takeUntil, switchMap, distinctUntilChanged } from "rxjs";

import { Unsub } from "unsub";

import {Workout} from "../../../../models/workout";


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
            *ngIf="(workout$ | async) as workout; else loading">
            {{ workout.name ? "Edit" : "Create"}} Workout
          </span>
          <ng-template #loading>
            ...Loading
          </ng-template>
        </h1>
      </div>
      <div *ngIf="(workout$ | async) as workout">
        <workout-form
          [workout]=workout
          (add)="createWorkout($event)"
          (update)="updateWorkout($event)"
          (remove)="removeWorkout($event)"
        >
        </workout-form>
      </div>

    </div>
  `
})
export class WorkoutComponent extends Unsub implements OnInit {

  workout$!: Observable<Workout | undefined>;

  constructor(
    private workoutService: WorkoutsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.workout$ = this.route.params.pipe(
      switchMap(param => this.workoutService.getWorkout(param['id'])),
      takeUntil(this.unsubscribe)
    )
    this.workout$.subscribe(w => console.log(w))
  }

  createWorkout(value: Workout) {
    this.workoutService.addWorkout(value)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.unsubscribe)
      ).subscribe();
    this.navigateToWorkouts()
  }

  updateWorkout(value: Workout) {
    this.workoutService.updateWorkout(value).pipe(takeUntil(this.unsubscribe)).subscribe();
    this.navigateToWorkouts();

  }

  removeWorkout(value: Workout) {
    this.workoutService.removeWorkouts(value).pipe(takeUntil(this.unsubscribe)).subscribe();
    this.navigateToWorkouts();
  }

  navigateToWorkouts() {
    this.router.navigate(['./health/workouts'])
  }

}
