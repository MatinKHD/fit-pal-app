import { Component, OnInit } from '@angular/core';

import { Store } from 'store';

import { Unsub } from 'unsub';

import { Observable, takeUntil } from 'rxjs';

import { ScheduleService } from '../../../shared/services/schedule/schedule.service';

import { MealsService } from 'src/health/shared/services/meals/meals.service';

import { WorkoutsService } from 'src/health/shared/services/workouts/workouts.service';

import { Meal } from 'src/models/meal';

import { Workout } from 'src/models/workout';

@Component({
  selector: 'app-schedule',
  styleUrls: [`./schedule.component.scss`],
  template: `
    <app-health-navigation></app-health-navigation>
    <div class="schedule-container">
      <schedule-calendar
        [items]="schedule$ | async"
        [date]="date$ | async"
        (change)="changeDate($event)"
        (select)="changeSection($event)"
      >
      </schedule-calendar>
      <schedule-assign
        *ngIf="open"
        [section]="selected$ | async"
        [list]="list$ | async"
        (update)="assignItem($event)"
        (cancel)="closeAssign()"
      ></schedule-assign>
    </div>
  `,
})
export class ScheduleComponent extends Unsub implements OnInit {
  open = false;

  date$!: Observable<Date | null>;
  schedule$!: Observable<any>;
  selected$!: Observable<any>;
  list$!: Observable<Meal[] | Workout[]>;

  constructor(
    private store: Store,
    private scheduleService: ScheduleService,
    private mealsService: MealsService,
    private workoutsService: WorkoutsService
  ) {
    super();
  }

  ngOnInit() {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');

    this.scheduleService.schedule$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe();

    this.scheduleService.selected$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe();

    this.mealsService.meals$.pipe(takeUntil(this.unsubscribe)).subscribe();

    this.workoutsService.workouts$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe();

    this.scheduleService.list$.pipe(takeUntil(this.unsubscribe)).subscribe();
    this.scheduleService.items$.pipe(takeUntil(this.unsubscribe)).subscribe();
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(data: any) {
    this.open = true;
    this.scheduleService.selectSection(data);
  }

  assignItem(items: string[]) {
    this.scheduleService.updateItems(items);
    this.closeAssign();
    location.reload();
  }

  closeAssign() {
    this.open = false;
  }
}
