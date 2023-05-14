import { Component, OnInit } from "@angular/core";

import { Observable, takeUntil } from "rxjs";

import { Store } from "store";

import { Unsub } from "unsub";

import {WorkoutsService} from "../../../shared/services/workouts/workouts.service";

import {Workout} from "../../../../models/workout";

@Component({
  selector: 'app-workouts',
  templateUrl: `./workouts.component.html`,
  styleUrls: [`./workouts.component.scss`]
})
export class WorkoutsComponent extends Unsub implements OnInit {


  workouts$: Observable<Workout[]> = this.store.select<Workout[]>('workouts')

  constructor(
    private workoutsService: WorkoutsService,
    private store: Store,
  ) {
    super();
  }

  ngOnInit() {
    this.workoutsService.workouts$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe();
  }

  onRemove(event: Workout) {
    this.workoutsService.removeWorkouts(event)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe();
    window.location.reload();
  }
}
